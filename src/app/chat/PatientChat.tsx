import {
  MinChatUiProvider,
  MainContainer,
  MessageInput,
  MessageContainer,
  MessageList,
  MessageHeader,
} from "@minchat/react-chat-ui";

export default function Patientchat() {
  return (
    <MinChatUiProvider theme="#6ea9d7">
      <MainContainer style={{ height: "100vh", width: "100vw" }}>
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
