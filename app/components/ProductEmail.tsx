import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

const ProductEmail = ({ link }: { link: string }) => {
  return (
    <Html>
      <Head />
      <Preview>Your Product is Here...</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container style={container}>
            <Text className="text-2xl font-bold">Hii Friend</Text>
            <Text className="text-lg text-gray-600">
              Thankyou for buying your product At{" "}
              <span className="text-[#f97316]">BeautyUI</span>
            </Text>
            <Section className="w-full flex justify-center mt-8">
              <Button
                href={link}
                className="text-white bg-[#f97316] rounded-lg px-10 py-4"
              >
                Download Files
              </Button>
            </Section>
            <Text className="text-lg ">
              Test <br />
              BeautyUI Teams
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const container = {
  margin: "0 auto",
  padding: "20px 0 40px",
};

export default ProductEmail;
