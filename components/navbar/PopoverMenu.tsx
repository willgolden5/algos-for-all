import { Avatar, Flex, Heading } from "@chakra-ui/react"
import { User } from "../../hooks/useUser"

type PopoverMenuProps = {
    user: User
}

const PopoverMenu = ({ user }: PopoverMenuProps) => {
    return <Flex>
        <Flex direction='row'>
            <Heading>{`${user.first_name} ${user.last_name}`}</Heading>
            <Avatar
                name={`${user.first_name} ${user.last_name}`}
                size="sm"
                bg="gray.700"
                color="white"
            />
        </Flex>
        <Heading></Heading>
    </Flex>
}

export default PopoverMenu
