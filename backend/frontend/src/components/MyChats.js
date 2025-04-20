import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:3000/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        {/* <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal> */}

        <GroupChatModal>
          <a
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
            href="http://localhost:3001"
          >
            AI Interview 
          </a>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>

    </Box>
  );
};

export default MyChats;



// import { AddIcon } from "@chakra-ui/icons";
// import { Box, Stack, Text } from "@chakra-ui/layout";
// import { useToast } from "@chakra-ui/toast";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { getSender } from "../config/ChatLogics";
// import ChatLoading from "./ChatLoading";
// import GroupChatModal from "./miscellaneous/GroupChatModal";
// import { Button } from "@chakra-ui/react";
// import { ChatState } from "../Context/ChatProvider";

// const MyChats = ({ fetchAgain }) => {
//   const [loggedUser, setLoggedUser] = useState();
//   const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
//   const toast = useToast();

//   // Fetch Chats from Backend API
//   const fetchChats = async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };

//       const { data } = await axios.get("http://localhost:3000/api/chat", config);
//       setChats(data);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: "Failed to Load the chats",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };

//   // Run the fetchChats when the component mounts or when fetchAgain changes
//   useEffect(() => {
//     setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
//     fetchChats();
//     // eslint-disable-next-line
//   }, [fetchAgain]);

//   // Filter Chats Based on User Role (Mentor or Mentee)
//   const filteredChats = chats?.filter((chat) => {
//     if (user.role === "Mentor") {
//       // If the user is a Mentor, show chats with Mentees only
//       return chat.users.some((u) => u.role === "Mentee");
//     } else if (user.role === "Mentee") {
//       // If the user is a Mentee, show chats with Mentors only
//       return chat.users.some((u) => u.role === "Mentor");
//     }
//     return true;
//   });

//   return (
//     <Box
//       d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
//       flexDir="column"
//       alignItems="center"
//       p={3}
//       bg="white"
//       w={{ base: "100%", md: "31%" }}
//       borderRadius="lg"
//       borderWidth="1px"
//     >
//       <Box
//         pb={3}
//         px={3}
//         fontSize={{ base: "28px", md: "30px" }}
//         fontFamily="Work sans"
//         d="flex"
//         w="100%"
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         My Chats
//         <GroupChatModal>
//           <Button
//             d="flex"
//             fontSize={{ base: "17px", md: "10px", lg: "17px" }}
//             rightIcon={<AddIcon />}
//           >
//             New Group Chat
//           </Button>
//         </GroupChatModal>
//       </Box>
//       <Box
//         d="flex"
//         flexDir="column"
//         p={3}
//         bg="#F8F8F8"
//         w="100%"
//         h="100%"
//         borderRadius="lg"
//         overflowY="hidden"
//       >
//         {filteredChats ? (
//           <Stack overflowY="scroll">
//             {filteredChats.map((chat) => (
//               <Box
//                 onClick={() => setSelectedChat(chat)}
//                 cursor="pointer"
//                 bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
//                 color={selectedChat === chat ? "white" : "black"}
//                 px={3}
//                 py={2}
//                 borderRadius="lg"
//                 key={chat._id}
//               >
//                 <Text>
//                   {!chat.isGroupChat
//                     ? getSender(loggedUser, chat.users)
//                     : chat.chatName}
//                 </Text>
//                 {chat.latestMessage && (
//                   <Text fontSize="xs">
//                     <b>{chat.latestMessage.sender.name} : </b>
//                     {chat.latestMessage.content.length > 50
//                       ? chat.latestMessage.content.substring(0, 51) + "..."
//                       : chat.latestMessage.content}
//                   </Text>
//                 )}
//               </Box>
//             ))}
//           </Stack>
//         ) : (
//           <ChatLoading />
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default MyChats;

// import { AddIcon } from "@chakra-ui/icons";
// import { Box, Stack, Text, Button } from "@chakra-ui/react";
// import { useToast } from "@chakra-ui/toast";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { getSender } from "../config/ChatLogics";
// import ChatLoading from "./ChatLoading";
// import GroupChatModal from "./miscellaneous/GroupChatModal";
// import { ChatState } from "../Context/ChatProvider";

// const MyChats = ({ fetchAgain }) => {
//   const [loggedUser, setLoggedUser] = useState();
//   const [allUsers, setAllUsers] = useState([]);
//   const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
//   const toast = useToast();

//   const fetchChats = async () => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${user.token}` } };
//       const { data } = await axios.get("http://localhost:3000/api/chat", config);
//       setChats(data);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: "Failed to Load the chats",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };

//   const fetchAllUsers = async () => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${user.token}` } };
//       const { data } = await axios.get("http://localhost:3000/api/user", config);
//       setAllUsers(data);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: "Failed to Load the users",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };

//   useEffect(() => {
//     setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
//     fetchChats();
//     fetchAllUsers();
//     // eslint-disable-next-line
//   }, [fetchAgain]);

//   // Filter users by opposite role (Mentor sees Mentees, Mentee sees Mentors)
//   const oppositeUsers = allUsers?.filter((u) => {
//     if (u._id === user._id) return false;
//     if (user.role === "Mentor") return u.role === "Mentee";
//     if (user.role === "Mentee") return u.role === "Mentor";
//     return false;
//   });

//   return (
//     <Box
//       d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
//       flexDir="column"
//       alignItems="center"
//       p={3}
//       bg="white"
//       w={{ base: "100%", md: "31%" }}
//       borderRadius="lg"
//       borderWidth="1px"
//     >
//       <Box
//         pb={3}
//         px={3}
//         fontSize={{ base: "28px", md: "30px" }}
//         fontFamily="Work sans"
//         d="flex"
//         w="100%"
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         My Chats
//         <GroupChatModal>
//           <Button
//             d="flex"
//             fontSize={{ base: "17px", md: "10px", lg: "17px" }}
//             rightIcon={<AddIcon />}
//           >
//             New Group Chat
//           </Button>
//         </GroupChatModal>
//       </Box>

//       <Box
//         d="flex"
//         flexDir="column"
//         p={3}
//         bg="#F8F8F8"
//         w="100%"
//         h="100%"
//         borderRadius="lg"
//         overflowY="hidden"
//       >
//         <Text fontWeight="bold" mb={2}>
//           Available {user.role === "Mentor" ? "Mentees" : "Mentors"}
//         </Text>
//         <Stack overflowY="scroll" mb={4}>
//           {oppositeUsers?.map((u) => (
//             <Box
//               key={u._id}
//               onClick={() => {
//                 // Logic to start chat with this user (optional)
//                 // Could open a modal or redirect
//               }}
//               cursor="pointer"
//               bg="#E8E8E8"
//               color="black"
//               px={3}
//               py={2}
//               borderRadius="lg"
//             >
//               <Text>{u.name}</Text>
//               <Text fontSize="xs" color="gray.600">{u.email}</Text>
//             </Box>
//           ))}
//         </Stack>

//         <Text fontWeight="bold" mb={2}>Your Chats</Text>
//         {chats ? (
//           <Stack overflowY="scroll">
//             {chats.map((chat) => (
//               <Box
//                 onClick={() => setSelectedChat(chat)}
//                 cursor="pointer"
//                 bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
//                 color={selectedChat === chat ? "white" : "black"}
//                 px={3}
//                 py={2}
//                 borderRadius="lg"
//                 key={chat._id}
//               >
//                 <Text>
//                   {!chat.isGroupChat
//                     ? getSender(loggedUser, chat.users)
//                     : chat.chatName}
//                 </Text>
//                 {chat.latestMessage && (
//                   <Text fontSize="xs">
//                     <b>{chat.latestMessage.sender.name} : </b>
//                     {chat.latestMessage.content.length > 50
//                       ? chat.latestMessage.content.substring(0, 51) + "..."
//                       : chat.latestMessage.content}
//                   </Text>
//                 )}
//               </Box>
//             ))}
//           </Stack>
//         ) : (
//           <ChatLoading />
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default MyChats;


// import { AddIcon } from "@chakra-ui/icons";
// import { Box, Stack, Text, Button } from "@chakra-ui/react";
// import { useToast } from "@chakra-ui/toast";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { getSender } from "../config/ChatLogics";
// import ChatLoading from "./ChatLoading";
// import GroupChatModal from "./miscellaneous/GroupChatModal";
// import { ChatState } from "../Context/ChatProvider";

// const MyChats = ({ fetchAgain }) => {
//   const [loggedUser, setLoggedUser] = useState();
//   const [allUsers, setAllUsers] = useState([]);
//   const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
//   const toast = useToast();

//   const fetchChats = async () => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${user.token}` } };
//       const { data } = await axios.get("http://localhost:3000/api/chat", config);
//       setChats(data);
//     } catch (error) {
//       toast({
//         title: "Error Occurred!",
//         description: "Failed to load the chats",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };

//   const fetchAllUsers = async () => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${user.token}` } };
//       const { data } = await axios.get("http://localhost:3000/api/user", config);
//       setAllUsers(data);
//     } catch (error) {
//       toast({
//         title: "Error Occurred!",
//         description: "Failed to load the users",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };

//   const accessChat = async (userId) => {
//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.post(
//         "http://localhost:3000/api/chat",
//         { userId },
//         config
//       );
//       if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
//       setSelectedChat(data);
//     } catch (error) {
//       toast({
//         title: "Error fetching the chat",
//         description: error.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     setLoggedUser(userInfo);
//     if (userInfo) {
//       fetchChats();
//       fetchAllUsers();
//     }
//     // eslint-disable-next-line
//   }, [fetchAgain]);

//   const oppositeUsers = allUsers?.filter((u) => {
//     if (!user || !user.role) return false;
//     if (u._id === user._id) return false;
//     if (user.role === "Mentor") return u.role === "Mentee";
//     if (user.role === "Mentee") return u.role === "Mentor";
//     return false;
//   });

//   return (
//     <Box
//       display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
//       flexDir="column"
//       alignItems="center"
//       p={3}
//       bg="white"
//       w={{ base: "100%", md: "31%" }}
//       borderRadius="lg"
//       borderWidth="1px"
//     >
//       <Box
//         pb={3}
//         px={3}
//         fontSize={{ base: "28px", md: "30px" }}
//         fontFamily="Work sans"
//         display="flex"
//         w="100%"
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         My Chats
//         <GroupChatModal>
//           <Button
//             display="flex"
//             fontSize={{ base: "17px", md: "10px", lg: "17px" }}
//             rightIcon={<AddIcon />}
//           >
//             New Group Chat
//           </Button>
//         </GroupChatModal>
//       </Box>

//       <Box
//         display="flex"
//         flexDir="column"
//         p={3}
//         bg="#F8F8F8"
//         w="100%"
//         h="100%"
//         borderRadius="lg"
//         overflowY="hidden"
//       >
//         {oppositeUsers?.length > 0 && (
//           <>
//             <Text fontWeight="bold" mb={2}>
//               Available {user?.role === "Mentor" ? "Mentees" : "Mentors"}
//             </Text>
//             <Stack overflowY="scroll" mb={4}>
//               {oppositeUsers.map((u) => (
//                 <Box
//                   key={u._id}
//                   onClick={() => accessChat(u._id)}
//                   cursor="pointer"
//                   bg="#E8E8E8"
//                   color="black"
//                   px={3}
//                   py={2}
//                   borderRadius="lg"
//                   _hover={{ background: "#D3D3D3" }}
//                 >
//                   <Text fontWeight="medium">{u.name}</Text>
//                   <Text fontSize="xs" color="gray.600">
//                     {u.email}
//                   </Text>
//                 </Box>
//               ))}
//             </Stack>
//           </>
//         )}

//         <Text fontWeight="bold" mb={2}>Your Chats</Text>
//         {chats ? (
//           <Stack overflowY="scroll">
//             {chats.map((chat) => (
//               <Box
//                 onClick={() => setSelectedChat(chat)}
//                 cursor="pointer"
//                 bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
//                 color={selectedChat === chat ? "white" : "black"}
//                 px={3}
//                 py={2}
//                 borderRadius="lg"
//                 key={chat._id}
//               >
//                 <Text>
//                   {!chat.isGroupChat
//                     ? getSender(loggedUser, chat.users)
//                     : chat.chatName}
//                 </Text>
//                 {chat.latestMessage && (
//                   <Text fontSize="xs">
//                     <b>{chat.latestMessage.sender.name} : </b>
//                     {chat.latestMessage.content.length > 50
//                       ? chat.latestMessage.content.substring(0, 51) + "..."
//                       : chat.latestMessage.content}
//                   </Text>
//                 )}
//               </Box>
//             ))}
//           </Stack>
//         ) : (
//           <ChatLoading />
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default MyChats;


// import { AddIcon } from "@chakra-ui/icons";
// import { Box, Stack, Text, Button } from "@chakra-ui/react";
// import { useToast } from "@chakra-ui/toast";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { getSender } from "../config/ChatLogics";
// import ChatLoading from "./ChatLoading";
// import GroupChatModal from "./miscellaneous/GroupChatModal";
// import { ChatState } from "../Context/ChatProvider";

// const MyChats = ({ fetchAgain }) => {
//   const [loggedUser, setLoggedUser] = useState();
//   const [allUsers, setAllUsers] = useState([]);
//   const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
//   const toast = useToast();

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     setLoggedUser(userInfo);
//     if (userInfo) {
//       fetchChats(userInfo);
//       fetchAllUsers(userInfo);
//     }
//     // eslint-disable-next-line
//   }, [fetchAgain]);

//   const fetchChats = async (userInfo) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       const { data } = await axios.get("http://localhost:3000/api/chat", config);
//       setChats(data);
//     } catch (error) {
//       toast({
//         title: "Error Occurred!",
//         description: "Failed to load the chats",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };

//   const fetchAllUsers = async (userInfo) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       const { data } = await axios.get("http://localhost:3000/api/user", config);
//       setAllUsers(data);
//     } catch (error) {
//       toast({
//         title: "Error Occurred!",
//         description: "Failed to load the users",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };

//   const accessChat = async (userId, userRole) => {
//     if (
//       (user.role === "Mentor" && userRole !== "Mentee") ||
//       (user.role === "Mentee" && userRole !== "Mentor")
//     ) {
//       toast({
//         title: "Invalid Chat",
//         description: "You can only chat with the opposite role.",
//         status: "warning",
//         duration: 3000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//       return;
//     }

//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.post(
//         "http://localhost:3000/api/chat",
//         { userId },
//         config
//       );

//       if (!chats.find((c) => c._id === data._id)) {
//         setChats([data, ...chats]);
//       }

//       setSelectedChat(data);
//     } catch (error) {
//       toast({
//         title: "Error fetching the chat",
//         description: error.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };

//   const oppositeUsers = allUsers?.filter((u) => {
//     if (!user || !user.role || !u.role) return false;
//     if (u._id === user._id) return false;

//     return (
//       (user.role === "Mentor" && u.role === "Mentee") ||
//       (user.role === "Mentee" && u.role === "Mentor")
//     );
//   });

//   return (
//     <Box
//       display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
//       flexDir="column"
//       alignItems="center"
//       p={3}
//       bg="white"
//       w={{ base: "100%", md: "31%" }}
//       borderRadius="lg"
//       borderWidth="1px"
//     >
//       <Box
//         pb={3}
//         px={3}
//         fontSize={{ base: "28px", md: "30px" }}
//         fontFamily="Work sans"
//         display="flex"
//         w="100%"
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         My Chats
//         <GroupChatModal>
//           <Button
//             display="flex"
//             fontSize={{ base: "17px", md: "10px", lg: "17px" }}
//             rightIcon={<AddIcon />}
//           >
//             New Group Chat
//           </Button>
//         </GroupChatModal>
//       </Box>

//       <Box
//         display="flex"
//         flexDir="column"
//         p={3}
//         bg="#F8F8F8"
//         w="100%"
//         h="100%"
//         borderRadius="lg"
//         overflowY="hidden"
//       >
//         {oppositeUsers?.length > 0 && (
//           <>
//             <Text fontWeight="bold" mb={2}>
//               Available {user?.role === "Mentor" ? "Mentees" : "Mentors"}
//             </Text>
//             <Stack overflowY="scroll" mb={4}>
//               {oppositeUsers.map((u) => (
//                 <Box
//                   key={u._id}
//                   onClick={() => accessChat(u._id, u.role)}
//                   cursor="pointer"
//                   bg="#E8E8E8"
//                   color="black"
//                   px={3}
//                   py={2}
//                   borderRadius="lg"
//                   _hover={{ background: "#D3D3D3" }}
//                 >
//                   <Text fontWeight="medium">{u.name}</Text>
//                   <Text fontSize="xs" color="gray.600">
//                     {u.email}
//                   </Text>
//                 </Box>
//               ))}
//             </Stack>
//           </>
//         )}

//         <Text fontWeight="bold" mb={2}>
//           Your Chats
//         </Text>
//         {chats ? (
//           <Stack overflowY="scroll">
//             {chats.map((chat) => (
//               <Box
//                 onClick={() => setSelectedChat(chat)}
//                 cursor="pointer"
//                 bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
//                 color={selectedChat === chat ? "white" : "black"}
//                 px={3}
//                 py={2}
//                 borderRadius="lg"
//                 key={chat._id}
//               >
//                 <Text>
//                   {!chat.isGroupChat
//                     ? getSender(loggedUser, chat.users)
//                     : chat.chatName}
//                 </Text>
//                 {chat.latestMessage && (
//                   <Text fontSize="xs">
//                     <b>{chat.latestMessage.sender.name} : </b>
//                     {chat.latestMessage.content.length > 50
//                       ? chat.latestMessage.content.substring(0, 51) + "..."
//                       : chat.latestMessage.content}
//                   </Text>
//                 )}
//               </Box>
//             ))}
//           </Stack>
//         ) : (
//           <ChatLoading />
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default MyChats;



// import { AddIcon } from "@chakra-ui/icons";
// import { Box, Stack, Text, Button } from "@chakra-ui/react";
// import { useToast } from "@chakra-ui/toast";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { getSender } from "../config/ChatLogics";
// import ChatLoading from "./ChatLoading";
// import GroupChatModal from "./miscellaneous/GroupChatModal";
// import { ChatState } from "../Context/ChatProvider";

// const MyChats = ({ fetchAgain }) => {
//   const [loggedUser, setLoggedUser] = useState();
//   const [allUsers, setAllUsers] = useState([]);
//   const toast = useToast();
//   const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

//   const fetchChats = async () => {
//     try {
//       const config = {
//         headers: {Authorization:` Bearer ${user.token}` },
//       };
//       const { data } = await axios.get("http://localhost:3000/api/chat", config);
//       setChats(data);
//     } 
//     catch (error) {
//       toast({
//         title: "Error Occurred!",
//         description: "Failed to load the chats",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };

//   const fetchAllUsers = async () => {
//     try {
//       const config = {
//         headers: { Authorization: `Bearer ${user.token}` },
//       };
//       const { data } = await axios.get("http://localhost:3000/api/user", config);
//       setAllUsers(data);
//     } 
//     catch (error) {
//       toast({
//         title: "Error Occurred!",
//         description: "Failed to load the users",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };

//   const accessChat = async (userId) => {
//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//           Authorization:` Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.post(
//         "http://localhost:3000/api/chat",
//         { userId },
//         config
//       );
//       if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
//       setSelectedChat(data);
//     } catch (error) {
//       toast({
//         title: "Error fetching the chat",
//         description: error.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     setLoggedUser(userInfo);
//     if (userInfo) {
//       fetchChats();
//       fetchAllUsers();
//     }
//     // eslint-disable-next-line
//   }, [fetchAgain]);

//   const oppositeUsers = allUsers?.filter((u) => {
//     if (!user || !user.role) return false;
//     if (u._id === user._id) return false;
//     return user.role === "Mentor" ? u.role === "Mentee" : u.role === "Mentor";
//   });

//   return (
//     <Box
//       display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
//       flexDir="column"
//       alignItems="center"
//       p={3}
//       bg="white"
//       w={{ base: "100%", md: "31%" }}
//       borderRadius="lg"
//       borderWidth="1px"
//     >
//       <Box
//         pb={3}
//         px={3}
//         fontSize={{ base: "28px", md: "30px" }}
//         fontFamily="Work sans"
//         display="flex"
//         w="100%"
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         My Chats
//         <GroupChatModal>
//           <Button
//             display="flex"
//             fontSize={{ base: "17px", md: "10px", lg: "17px" }}
//             rightIcon={<AddIcon />}
//           >
//             New Group Chat
//           </Button>
//         </GroupChatModal>
//       </Box>

//       <Box
//         display="flex"
//         flexDir="column"
//         p={3}
//         bg="#F8F8F8"
//         w="100%"
//         h="100%"
//         borderRadius="lg"
//         overflowY="hidden"
//       >
//         {oppositeUsers?.length > 0 && (
//           <>
//             <Text fontWeight="bold" mb={2}>
//               Available {user?.role === "Mentor" ? "Mentees" : "Mentors"}
//             </Text>
//             <Stack overflowY="scroll" mb={4}>
//               {oppositeUsers.map((u) => (
//                 <Box
//                   key={u._id}
//                   onClick={() => accessChat(u._id)}
//                   cursor="pointer"
//                   bg="#E8E8E8"
//                   color="black"
//                   px={3}
//                   py={2}
//                   borderRadius="lg"
//                   _hover={{ background: "#D3D3D3" }}
//                 >
//                   <Text fontWeight="medium">{u.name}</Text>
//                   <Text fontSize="xs" color="gray.600">
//                     {u.email}
//                   </Text>
//                 </Box>
//               ))}
//             </Stack>
//           </>
//         )}

//         <Text fontWeight="bold" mb={2}>Your Chats</Text>
//         {chats ? (
//           <Stack overflowY="scroll">
//             {chats.map((chat) => (
//               <Box
//                 onClick={() => setSelectedChat(chat)}
//                 cursor="pointer"
//                 bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
//                 color={selectedChat === chat ? "white" : "black"}
//                 px={3}
//                 py={2}
//                 borderRadius="lg"
//                 key={chat._id}
//               >
//                 <Text>
//                   {!chat.isGroupChat
//                     ? getSender(loggedUser, chat.users)
//                     : chat.chatName}
//                 </Text>
//                 {chat.latestMessage && (
//                   <Text fontSize="xs">
//                     <b>{chat.latestMessage.sender.name} : </b>
//                     {chat.latestMessage.content.length > 50
//                       ? chat.latestMessage.content.substring(0, 51) + "..."
//                       : chat.latestMessage.content}
//                   </Text>
//                 )}
//               </Box>
//             ))}
//           </Stack>
//         ) : (
//           <ChatLoading />
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default MyChats;


