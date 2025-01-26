import {
  MinChatUiProvider,
  MainContainer,
  MessageInput,
  MessageContainer,
  MessageList,
  MessageHeader,
} from "@minchat/react-chat-ui";

const myColorSet = {
  // input
  "--input-background-color": "#FAFAFA",
  "--input-text-color": "#FFFFFF",
  "--input-element-color": "#007AFF",
  "--input-attach-color": "#757575",
  "--input-send-color": "#007AFF",
  "--input-placeholder-color": "#BDBDBD",

  // message header
  "--message-header-background-color": "#FFFFFF",
  "--message-header-text-color": "#2C2C2C",
  "--message-header-last-active-color": "#007AFF",
  "--message-header-back-color": "#757575",

  // chat list header
  "--chatlist-header-background-color": "#FFFFFF",
  "--chatlist-header-text-color": "#2C2C2C",
  "--chatlist-header-divider-color": "#EEEEEE",

  //chatlist
  "--chatlist-background-color": "#FFFFFF",
  "--no-conversation-text-color": "#757575",

  //chat item
  "--chatitem-background-color": "#FFFFFF",
  "--chatitem-selected-background-color": "#F5F9FF",
  "--chatitem-title-text-color": "#2C2C2C",
  "--chatitem-content-text-color": "#757575",
  "--chatitem-hover-color": "#F8F8F8",

  //main container
  "--container-background-color": "#FFFFFF",

  //loader
  "--loader-color": "#007AFF",

  //message list
  "--messagelist-background-color": "#FFFFFF",
  "--no-message-text-color": "#757575",

  // incoming message
  "--incoming-message-text-color": "#2C2C2C",
  "--incoming-message-name-text-color": "#757575",
  "--incoming-message-background-color": "#F0F0F0",
  "--incoming-message-timestamp-color": "#BDBDBD",
  "--incoming-message-link-color": "#007AFF",

  //outgoing message
  "--outgoing-message-text-color": "#FFFFFF",
  "--outgoing-message-background-color": "#007AFF",
  "--outgoing-message-timestamp-color": "#E0E0E0",
  "--outgoing-message-checkmark-color": "#FFFFFF",
  "--outgoing-message-loader-color": "#FFFFFF",
  "--outgoing-message-link-color": "#FFFFFF",
};

export default function Patientchat() {
  return (
    <MinChatUiProvider
      theme="#6ea9d7"
      colorSet={myColorSet}
    >
      <MainContainer>
        <MessageContainer>
          <MessageHeader />
          <MessageList
            currentUserId="dan"
            messages={[
              {
                text: "Hello",
                user: {
                  id: "mark",
                  name: "Markus",
                },
              },
            ]}
          />
          <MessageInput
            placeholder="Type message here"
            showSendButton={true}
          />
        </MessageContainer>
      </MainContainer>
    </MinChatUiProvider>
  );
}
