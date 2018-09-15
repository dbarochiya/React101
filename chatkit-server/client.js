const { ChatManager, TokenProvider } = require("@pusher/chatkit");
const { JSDOM } = require("jsdom");
const util = require("util");
const prompt = require("prompt");
const axios = require("axios");
const readline = require("readline");

const makeChatkitNodeCompatible = () => {
  const { window } = new JSDOM();
  global.window = window;
  global.navigator = {};
};

makeChatkitNodeCompatible();

const createUser = async username => {
  try {
    await axios.post("http://localhost:3001/users", { username });
  } catch ({ message }) {
    throw new Error("failed to create user , ${message}");
  }
};
const main = async () => {
  try {
    prompt.start();
    prompt.message = "";
    const get = util.promisify(prompt.get);

    const usernameSchema = [
      {
        description: "Enter Name",
        name: "username",
        required: true
      }
    ];

    const { username } = await get(usernameSchema);
    await createUser(username);

    const chatManager = new ChatManager({
      instanceLocator: "v1:us1:97084d20-4488-413b-9650-fbe5ef97e2ba",
      userId: username,
      tokenProvider: new TokenProvider({
        url: "http://localhost:3001/authenticate"
      })
    });

    const currentUser = await chatManager.connect();

    const joinableRooms = await currentUser.getJoinableRooms();
    const availableRooms = [...currentUser.rooms, ...joinableRooms];

    console.log("Available rooms:");
    availableRooms.forEach((room, index) => {
      console.log(`${index} - ${room.name}`);
    });

    const roomSchema = [
      {
        description: "Select a room",
        name: "room",
        conform: v => {
          if (v >= availableRooms.length) {
            return false;
          }
          return true;
        },
        message: "Room must only be numbers",
        required: true
      }
    ];

    const { room: chosenRoom } = await get(roomSchema);
    const room = availableRooms[chosenRoom];

    await currentUser.subscribeToRoom({
      roomId: room.id,
      hooks: {
        onNewMessage: message => {
          const { senderId, text } = message;
          if (senderId === username) return;
          console.log(`${senderId}: ${text}`);
        }
      },
      messageLimit: 0
    });

    console.log(`Joined ${room.name} successfully`);

    const input = readline.createInterface({ input: process.stdin });

    input.on("line", async text => {
      await currentUser.sendMessage({ roomId: room.id, text });
    });
  } catch (err) {
    console.log(`Failed with ${err}`);
    process.exit(1);
  }
};
main();
