import { Avatar } from "@chakra-ui/react"
import { User } from "../../hooks/useUser"

type ProfileMenuProps = {
    user: User
}


const ProfileMenu = ({user}: ProfileMenuProps) => {
   return <Avatar name={`${user.first_name} ${user.last_name}`} />

}

export default ProfileMenu
