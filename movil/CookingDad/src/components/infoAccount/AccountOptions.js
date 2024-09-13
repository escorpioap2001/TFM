import React, { useState } from "react";
import { View } from "react-native";
import { ListItem, Icon, Text } from "react-native-elements";
import { Model } from "../shared";
import { map } from "lodash";
import { DisplayNameForm } from "./DisplayNameForm";
import { DisplayEmailForm } from "./DisplayEmailForm";
import { DisplayPasswordForm } from "./DisplayPasswordForm";

export function AccountOptions(props) {
  const {onReload} = props;
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const selectedComponenet = (key) => {
    if (key === "displayName") {
      setRenderComponent(<DisplayNameForm onClose={onCloseOpenModal} onReload={onReload}/>);
    }

    if (key === "email") {
      setRenderComponent(<DisplayEmailForm onClose={onCloseOpenModal} onReload={onReload}/>);
    }

    if (key === "password") {
      setRenderComponent(<DisplayPasswordForm onClose={onCloseOpenModal}/>);
    }

    onCloseOpenModal();
  };

  const menuOptions = getMenuOptions(selectedComponenet);

  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem key={index} bottomDivider onPress={() => menu.onPress()}>
          <Icon
            type={menu.iconType}
            name={menu.iconNameLeft}
            color={menu.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type={menu.iconType}
            name={menu.iconNameRight}
            color={menu.iconColorRight}
          />
        </ListItem>
      ))}

      <Model show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Model>
    </View>
  );
}

function getMenuOptions(selectedComponent) {
  return [
    {
      title: "Cambiar nombre y apellidos",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("displayName"),
    },
    {
      title: "Cambiar email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("email"),
    },
    {
      title: "Cambiar contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("password"),
    },
  ];
}
