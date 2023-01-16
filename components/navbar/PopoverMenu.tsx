import { Avatar, Box, Divider, Flex, Heading, Text } from "@chakra-ui/react"
import { User } from "../../hooks/useUser"

type PopoverMenuProps = {
    user: User
}

const MenuRow = ({ children, link }: { children: React.ReactNode, link: string }) => (
    <Flex
        as="a"
        w='full'
        direction="column"
        px={2}
        _hover={{ bg: "gray.100", cursor: "pointer" }}
        href={link}
    >
        <Box pt={4}>{children}</Box>
        <Divider w='100%' py={2}/>
    </Flex>
)

const PopoverMenu = ({ user }: PopoverMenuProps) => {
    return (
        <Flex direction="column" justify='center' align='center'>
            <Flex direction='row' justify='center' align='center' w='full'>
                <Avatar
                    name={`${user.first_name} ${user.last_name}`}
                    size="lg"
                    bg="gray.700"
                    color="white"
                    m={2}
                />
                <Text fontSize='xl'>{`${user.first_name} ${user.last_name}`}</Text>
            </Flex>
            <Divider w='100%'  />
            <MenuRow link="#">
                <Heading as='a' w='100%' fontSize='2xl'>Account</Heading>
            </MenuRow>
            <MenuRow link="#">
                <Heading as='a' w='100%' fontSize='2xl'>Settings</Heading>
            </MenuRow>
            <MenuRow link="#">
                <Heading as='a' w='100%' fontSize='2xl'>Dashboard</Heading>
            </MenuRow>
            <MenuRow link="#">
                <Heading as='a' w='100%' fontSize='2xl'>Trades</Heading>
            </MenuRow>
            <MenuRow link="#">
                <Heading as='a' w='100%' fontSize='2xl'>Algorithms</Heading>
            </MenuRow>
            <Flex direction='row' justify="space-evenly" align='center' w="100%" px={4} py={4}>
                <Text>Logout</Text>
                <Text>Help</Text>
                <Text>Contact</Text>
            </Flex>
        </Flex>
    )
}

export default PopoverMenu
