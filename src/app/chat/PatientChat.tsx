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
  "--input-background-color": "var(--background-muted)", // Muted background color for inputs
  "--input-text-color": "var(--foreground)", // Default foreground for input text
  "--input-element-color": "var(--primary)", // Primary color for interactive elements
  "--input-attach-color": "var(--primary)", // Primary color for attach icon
  "--input-send-color": "var(--primary)", // Primary color for send icon
  "--input-placeholder-color": "var(--muted-foreground)", // Muted foreground for placeholders

  // message header
  "--message-header-background-color": "var(--background)", // Default background for header
  "--message-header-text-color": "var(--foreground)", // Default foreground for text
  "--message-header-last-active-color": "var(--muted-foreground)", // Muted foreground for last active time
  "--message-header-back-color": "var(--background-muted)", // Muted background for back button

  // chat list header
  "--chatlist-header-background-color": "var(--background)", // Default background for chat list header
  "--chatlist-header-text-color": "var(--foreground)", // Default foreground for header text
  "--chatlist-header-divider-color": "var(--border)", // Border color for dividers

  // chat list
  "--chatlist-background-color": "var(--background-muted)", // Muted background for chat list
  "--no-conversation-text-color": "var(--muted-foreground)", // Muted foreground for empty state text

  // chat item
  "--chatitem-background-color": "var(--background)", // Default background for chat items
  "--chatitem-selected-background-color": "var(--accent-muted)", // Muted accent for selected item
  "--chatitem-title-text-color": "var(--foreground)", // Default foreground for titles
  "--chatitem-content-text-color": "var(--muted-foreground)", // Muted foreground for content
  "--chatitem-hover-color": "var(--background-hover)", // Hover background color

  // main container
  "--container-background-color": "var(--background-muted)", // Muted background for main container

  // loader
  "--loader-color": "var(--primary)", // Primary color for loaders

  // message list
  "--messagelist-background-color": "var(--background)", // Default background for message list
  "--no-message-text-color": "var(--muted-foreground)", // Muted foreground for empty message text

  // incoming message
  "--incoming-message-text-color": "var(--foreground)", // Default foreground for incoming message text
  "--incoming-message-name-text-color": "var(--primary)", // Primary color for names
  "--incoming-message-background-color": "var(--accent-muted)", // Muted accent for incoming message background
  "--incoming-message-timestamp-color": "var(--muted-foreground)", // Muted foreground for timestamps
  "--incoming-message-link-color": "var(--primary-hover)", // Hover effect for links

  // outgoing message
  "--outgoing-message-text-color": "var(--foreground)", // Default foreground for outgoing message text
  "--outgoing-message-background-color": "var(--background-muted)", // Muted background for outgoing messages
  "--outgoing-message-timestamp-color": "var(--primary)", // Primary color for timestamps
  "--outgoing-message-checkmark-color": "var(--primary)", // Primary color for checkmarks
  "--outgoing-message-loader-color": "var(--primary)", // Primary color for loaders
  "--outgoing-message-link-color": "var(--primary-hover)", // Hover effect for links
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
