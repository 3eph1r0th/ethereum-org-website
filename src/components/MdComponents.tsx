import { ComponentProps } from "react"
import {
  Badge,
  Box,
  calc,
  chakra,
  Divider as ChakraDivider,
  Flex,
  Text,
  type BoxProps,
  type FlexProps,
  type HeadingProps,
  useToken,
  ListItem,
  UnorderedList,
  OrderedList,
  Icon,
} from "@chakra-ui/react"
import { CiLink } from "react-icons/ci"
import ButtonDropdown, {
  type IProps as ButtonDropdownProps,
} from "@/components/ButtonDropdown"
import { ButtonLink } from "@/components/Buttons"
import Card from "./Card"
import DocLink from "./DocLink"
import Emoji from "./Emoji"
import ExpandableCard from "./ExpandableCard"
import GlossaryTooltip from "./Glossary/GlossaryTooltip"
import InfoBanner from "./InfoBanner"
import MarkdownImage from "@/components/MarkdownImage"
import MdLink from "@/components/MdLink"
import { mdxTableComponents } from "@/components/Table"
import OldHeading from "@/components/OldHeading"
import QuizWidget from "./Quiz/QuizWidget"

import Link from "@/components/Link"
import type { ChildOnlyProp } from "@/lib/types"
import YouTube from "@/components/YouTube"
import Contributors from "@/components/Contributors"

/**
 * Base HTML elements
 */
const headingPropsForAnchor = (id?: string): HeadingProps =>
  id
    ? ({
        scrollMarginTop: 28,
        id,
        "data-group": true,
        position: "relative",
      } as HeadingProps)
    : {}

export const commonHeadingProps = (id?: string): HeadingProps => ({
  fontWeight: 700,
  lineHeight: 1.4,
  ...headingPropsForAnchor(id),
})

const IdAnchor: React.FC<{ id?: string }> = ({ id }) =>
  id ? (
    <Link href={`#${id}`}
      position="absolute"
      insetInlineEnd="100%"
      aria-label={id.replaceAll("-", " ") + " permalink"}
    >
      <Icon
        as={CiLink}
        opacity={0}
        _groupHover={{ opacity: 1 }}
        transition="opacity 0.1s ease-in-out"
        fontSize="xl"
        me={1}
      />
    </Link>
  ) : null

export const Heading1 = ({ children, ...rest }: HeadingProps) => (
  <OldHeading as="h1" {...commonHeadingProps()} fontSize="2.5rem" {...rest}>
    {children}
  </OldHeading>
)

export const Heading2 = ({ id, children, ...rest }: HeadingProps) => (
  <OldHeading as="h2" {...commonHeadingProps(id)} fontSize="2rem" mt={16} {...rest}>
    <IdAnchor id={id} />
    {children}
  </OldHeading>
)

export const Heading3 = ({ id, children, ...rest }: HeadingProps) => (
  <OldHeading as="h3" {...commonHeadingProps(id)} fontSize="2xl" {...rest}>
    <IdAnchor id={id} />
    {children}
  </OldHeading>
)

export const Heading4 = ({ id, children, ...rest }: HeadingProps) => (
  <OldHeading as="h4" {...commonHeadingProps(id)} fontSize="xl" fontWeight={600} {...rest}>
    <IdAnchor id={id} />
    {children}
  </OldHeading>
)

export const Pre = (props: ChildOnlyProp) => (
  <chakra.pre
    bg="preBackground"
    border="1px"
    borderColor="preBorder"
    borderRadius="base"
    maxW="full"
    overflowX="scroll"
    p={4}
    whiteSpace="pre-wrap"
    {...props}
  />
)

export const Paragraph = (props: ChildOnlyProp) => (
  <Text color="text300" mt={8} mb={4} {...props} />
)

export const HR = () => (
  <ChakraDivider
    mt={8}
    mb={4}
    display="inline-block"
    position="inherit"
    bg="border"
  />
)

// All base html element components
export const htmlElements = {
  a: MdLink,
  div: Box,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  hr: HR,
  img: MarkdownImage,
  li: ListItem,
  ol: OrderedList,
  p: Paragraph,
  pre: Pre,
  ul: UnorderedList,
  ...mdxTableComponents,
}

/**
 * Custom React components
 */
export const Page = (props: FlexProps) => (
  <Flex
    flexDirection={{ base: "column", lg: "row" }}
    justifyContent="space-between"
    mx="auto"
    mb={16}
    pt={{ lg: 16 }}
    width="full"
    sx={{ "h2:first-of-type": { mt: { lg: 0 } } }}
    {...props}
  />
)

export const Title = (props: ChildOnlyProp) => <Heading1 mt={4} {...props} />

export const ContentContainer = (props: Pick<BoxProps, "id" | "children">) => {
  const lgBp = useToken("breakpoints", "lg")

  return (
    <Box
      as="article"
      flex={`1 1 ${lgBp}`}
      position="relative"
      px={8}
      pb={8}
      {...props}
      sx={{
        ".featured": {
          pl: 4,
          ml: -4,
          borderLeft: "1px dotted",
          borderColor: "primary.base",
        },
        ".citation p": {
          color: "text200",
        },
      }}
    />
  )
}

export const InfoColumn = (props: ChildOnlyProp) => (
  <Flex
    as="aside"
    flexDirection="column"
    flex="0 1 400px"
    ml={8}
    mr={16}
    position="sticky"
    top="6.25rem"
    height={calc("100vh").subtract("80px").toString()}
    {...props}
  />
)

export const InfoTitle = (props: ChildOnlyProp) => (
  <Heading2
    fontSize={{ base: "2.5rem", lg: "5xl" }}
    textAlign={{ base: "left", lg: "right" }}
    mt={0}
    {...props}
  />
)

export const MobileButton = (props: ChildOnlyProp) => {
  const borderColor = useToken("colors", "border")
  return (
    <Box
      bg="background.base"
      boxShadow={`0 -1px 0 ${borderColor}`}
      position="sticky"
      bottom={0}
      zIndex={99}
      p={8}
      width="full"
      {...props}
    />
  )
}

export const StyledButtonDropdown = ({
  list,
  ...rest
}: FlexProps & Pick<ButtonDropdownProps, "list">) => (
  <Flex align="flex-end" justify="flex-end" mb={8} {...rest}>
    <ButtonDropdown list={list} w={{ base: "full", lg: "auto" }} minW="240px" />
  </Flex>
)

export const MobileButtonDropdown = (
  props: ComponentProps<typeof StyledButtonDropdown>
) => <StyledButtonDropdown mb={0} {...props} />

export const Divider = () => <Box my={16} w="10%" h={1} bgColor="homeDivider" />

// All custom React components
export const reactComponents = {
  Badge,
  ButtonLink,
  Card,
  ContentContainer,
  Contributors,
  Divider,
  DocLink,
  Emoji,
  ExpandableCard,
  GlossaryTooltip,
  InfoBanner,
  InfoColumn,
  InfoTitle,
  MobileButton,
  MobileButtonDropdown,
  Page,
  QuizWidget,
  StyledButtonDropdown,
  Title,
  YouTube,
}

/**
 * All base markdown components as default export
 */
export default {
  ...htmlElements,
  ...reactComponents,
}