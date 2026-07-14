"use client";

import React from "react";
import { ArrowRightFromSquare } from "@gravity-ui/icons";
import { Avatar, Dropdown, Label } from "@heroui/react";

interface ProfileDropdownProps {
  handleLogOut: () => void | Promise<void>;
  image?: string | null;
  name?: string | null;
  email?: string | null;
}

const ProfileDropdown = ({
  handleLogOut,
  image,
  name,
  email,
}: ProfileDropdownProps) => {
  return (
    <Dropdown>
      {/* Trigger Avatar with a subtle neon border hover effect */}
      <Dropdown.Trigger className="rounded-full cursor-pointer ring-1 ring-white/10 hover:ring-cyan-500/50 transition-all p-0.5 bg-slate-950">
        <Avatar className="w-9 h-9 border border-transparent">
          <Avatar.Image
            alt={name ?? "User"}
            src={image ?? ""}
            className="object-cover"
          />
          <Avatar.Fallback delayMs={600} className="bg-gradient-to-br from-indigo-600 to-cyan-500 text-white font-semibold">
            {name?.[0]?.toUpperCase() ?? "U"}
          </Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>

      {/* Styled Dropdown Popover matching the auth card styling */}
      <Dropdown.Popover className="bg-slate-900/90 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl min-w-[240px] text-slate-200">
        {/* User Info Header */}
        <div className="px-4 pt-4 pb-2 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Avatar size="sm" className="ring-1 ring-white/10">
              <Avatar.Image
                alt={name ?? "User"}
                src={image ?? ""}
                className="object-cover"
              />
              <Avatar.Fallback delayMs={600} className="bg-slate-800 text-cyan-400 font-medium text-xs">
                {name?.[0]?.toUpperCase() ?? "U"}
              </Avatar.Fallback>
            </Avatar>

            <div className="flex flex-col min-w-0">
              <p className="text-sm font-semibold text-white truncate leading-tight">
                {name ?? "User"}
              </p>
              <p className="text-xs text-slate-400 truncate mt-0.5">
                {email ?? ""}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <Dropdown.Menu className="p-1.5 flex flex-col gap-1">
          {/* Profile Link */}
          <Dropdown.Item
            href="/profile"
            id="profile"
            textValue="Profile"
            className="rounded-xl px-3 py-2.5 hover:bg-white/5 data-[hover=true]:bg-white/5 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <Label className="cursor-pointer font-medium text-sm">Profile Dashboard</Label>
          </Dropdown.Item>

          {/* Logout Button */}
          <Dropdown.Item
            onClick={handleLogOut}
            id="logout"
            textValue="Logout"
            className="rounded-xl px-3 py-2.5 hover:bg-rose-500/10 data-[hover=true]:bg-rose-500/10 text-rose-400 transition-colors group"
          >
            <div className="flex w-full items-center justify-between gap-2 cursor-pointer">
              <Label className="cursor-pointer font-medium text-sm group-hover:text-rose-300">Log Out</Label>
              <ArrowRightFromSquare className="size-3.5 text-rose-400 group-hover:text-rose-300 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};

export default ProfileDropdown;