import { TextArea as NativeBaseTextArea, IInputProps } from "native-base";

export function TextArea({ ...rest }: IInputProps) {
  return (
    <NativeBaseTextArea
      bg="gray.700"
      h={14}
      size="md"
      borderWidth={0}
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      autoCompleteType={false}
      _focus={{ borderWidth: 1, borderColor: "green.500", bg: "gray.700" }}
      {...rest}
    />
  );
}
