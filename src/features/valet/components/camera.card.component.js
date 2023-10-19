import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { CardComponent } from "../../../components/utils/card.component";
import UploadBtnIcon from "../../../../assets/svgs/upload_btn";
import * as ImagePicker from "expo-image-picker";
import { ImageContainerContext } from "../utils/imageObjectContainer";
import UploadCamIcon from "../../../../assets/svgs/upload_cam";

// const Caption = styled.Text`
//   font-size: ${(props) => props.theme.fontSizes.body};
//   color: ${(props) => props.theme.colors.darkText.inverse};
// `

const CustomCard = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Picture = styled.Image`
  height: 100%;
  border-radius: 20px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.buttonColors.primary};
  border-radius: 20px;
  padding: 10px 40px 10px 40px;
  gap: 10px;
  widht: 100%;
`;

const ButtonLabel = styled.Text`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const CamCardComponent = ({ imageLink, _key, clearContainer, side }) => {
  const [image, setImage] = useState(null);
  const {
    front,
    setFront,
    clearfront,
    back,
    setBack,
    clearback,
    left,
    setLeft,
    clearleft,
    right,
    setRight,
    clearright,
    clearall,
  } = useContext(ImageContainerContext);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      if (side === "front") {
        setFront(result.assets[0].uri);
      }
      if (side === "back") {
        setBack(result.assets[0].uri);
      }
      if (side === "left") {
        setLeft(result.assets[0].uri);
      }
      if (side === "right") {
        setRight(result.assets[0].uri);
      }
    }
  };

  const takeImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      const { uri } = result.assets[0];
      const fileName = uri.substring(uri.lastIndexOf("/") + 1);
      if (!result.canceled) {
        setImage(uri);
        if (side === "front") {
          setFront(uri);
        }
        if (side === "back") {
          setBack(uri);
        }
        if (side === "left") {
          setLeft(uri);
        }
        if (side === "right") {
          setRight(uri);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClear = () => {
    if (side === "front") {
      clearfront();
    }
    if (side === "back") {
      clearback();
    }
    if (side === "left") {
      clearleft();
    }
    if (side === "right") {
      clearright();
    }
    setImage(null);
  };

  // console.log(image, "from cam card component")

  return (
    <CardComponent
      key={_key}
      overrideChildren={true}
      bordered={true}
      size={{
        height: "250px",
        width: "100%",
      }}
      onPress={pickImage}
    >
      <CustomCard>
        {image && !imageLink && side ? (
          <Picture
            source={{ uri: image }}
            onError={(error) => console.log(error, "from image")}
            style={{ width: 280, height: 180, marginBottom: 10 }}
          />
        ) : null}
        {!image && imageLink && !side && (
          <Picture
            source={{ uri: imageLink }}
            onError={(error) => console.log(error, "from image")}
            style={{ width: 180, height: 180, marginBottom: 10 }}
          />
        )}
        {!image &&
          !imageLink &&
          typeof imageObject !== "undefined" &&
          Object.keys(imageObject).length > 0 &&
          !side && (
            <Picture
              source={{
                uri: imageObject[
                  `object_${Object.keys(imageObject).length - 1}`
                ],
              }}
              onError={(error) => console.log(error, "from image")}
              style={{ width: 180, height: 180, marginBottom: 10 }}
            />
          )}
        {!image && <UploadCamIcon width={60} height={60} />}
      </CustomCard>
    </CardComponent>
  );
};
