import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CButton,
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
} from "@coreui/react";
import { cilAccountLogout } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";

import logoImg from "@assets/brand/sygnet.png";
import sygnetImg from "@assets/brand/sygnet.png";

// sidebar nav config
import navigation from "../_nav";
import { useLogoutMutation } from "../apis/account/accounts";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const { mutate: logout } = useLogoutMutation();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        localStorage.clear();
        window.location.href = '/login';
      },
    });
  };

  return (
    <CSidebar
      className="border-end"
      colorScheme="white"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <img
            src={logoImg}
            alt="Logo"
            height={32}
            className="sidebar-brand-full"
          />
          <img
            src={sygnetImg}
            alt="Mini Logo"
            height={32}
            className="sidebar-brand-narrow"
          />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: "set", sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      {/* 하단 영역 */}
      <CSidebarFooter className="border-top d-flex flex-column gap-2 p-3">
        <CButton
          variant="ghost"
          color="dark"
          className="d-flex align-items-center nav-icon gap-2 px-3 py-2 w-100 text-start"
          style={{ border: "none", background: "none" }}
          onClick={handleLogout}
        >
          <CIcon icon={cilAccountLogout} className="nav-icon" />
          {!unfoldable && <span className="fw-semibold">로그아웃</span>}
        </CButton>
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
