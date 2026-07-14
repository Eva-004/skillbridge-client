import {ArrowRightFromSquare, Gear, Persons} from "@gravity-ui/icons";
import {Avatar, Dropdown, Label} from "@heroui/react";
const ProfileDropdown = ({handleLogOut,image,name,email}) => {
    return (
        <Dropdown>
      <Dropdown.Trigger className="rounded-full">
        <Avatar>
          <Avatar.Image
            alt={name}
            src={image}
            className="object-cover"
          />
          <Avatar.Fallback delayMs={600}>{name[0]}</Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image
                alt={name}
                src={image}
            className="object-cover"
              />
              <Avatar.Fallback delayMs={600}>{name[0]}</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <p className="text-sm leading-5 font-medium">{name}</p>
              <p className="text-xs leading-none text-gray-500">{email}</p>
            </div>
          </div>
        </div>
        <Dropdown.Menu>
          
          <Dropdown.Item href="/profile" id="profile" textValue="Profile">
            <Label>Profile</Label>
          </Dropdown.Item>
          
          <Dropdown.Item onClick={handleLogOut}  id="logout" textValue="Logout" variant="danger">
            <div className="flex w-full items-center justify-between gap-2">
              <Label>Log Out</Label>
              <ArrowRightFromSquare className="size-3.5 text-danger" />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
    );
};

export default ProfileDropdown;