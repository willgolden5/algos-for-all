import { Avatar, Popover, PopoverTrigger, PopoverContent, PopoverBody, useDisclosure } from "@chakra-ui/react"
import { User } from "../../hooks/useUser"
import PopoverMenu from "./PopoverMenu"

type ProfileMenuProps = {
    user: User
}


const ProfileMenu = ({user}: ProfileMenuProps) => {
    const { isOpen, onToggle, onClose } = useDisclosure();
    return (
        <Popover isOpen={isOpen} onClose={onClose} placement="bottom-end" isLazy>
            <PopoverTrigger>
                <Avatar
                    name={`${user.first_name} ${user.last_name}`}
                    size="sm"
                    bg="teal.700"
                    color="white"
                    onClick={onToggle}
                    cursor={'pointer'}
                    data-cy="user-badge"
                />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverBody>
                    <PopoverMenu />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )

}

export default ProfileMenu
