import React from "react";

import { Button } from "fundamental-react/Button";
import { Dialog } from "fundamental-react/Dialog";
import { Icon } from "fundamental-react/Icon";
import { MessageStrip } from "fundamental-react/MessageStrip";
import { Shellbar } from "fundamental-react/Shellbar";

interface SettingsDialogProps {
  onClose: () => void;
}

const SettingsDialog: React.SFC<SettingsDialogProps> = ({
  onClose,
}: SettingsDialogProps) => {
  return (
    <Dialog
      title="Settings"
      show={true}
      actions={[
        <Button key="1" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <p>No settings defined yet...</p>
    </Dialog>
  );
};

const App: React.SFC = () => {
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  return (
    <div className="container">
      <Shellbar
        logo={<Icon glyph="begin" size="l" style={{ color: "white" }} />}
        productTitle="The Demo App"
        actions={[
          {
            title: "Version 0.0.1",
            glyph: "settings",
            callback: (): void => setSettingsOpen(true),
          },
        ]}
      ></Shellbar>
      {settingsOpen ? (
        <SettingsDialog onClose={(): void => setSettingsOpen(false)} />
      ) : null}
      <h1>Hello!</h1>
      <MessageStrip type="information">
        Hello Fundamental React <Icon glyph="accept" size="m" />
      </MessageStrip>
    </div>
  );
};

export default App;
