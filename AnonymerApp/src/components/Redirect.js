import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Redirect({ to, component, roles }) {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");
    useEffect(() => {
        if (!roles.includes(role)) {
            navigate(to);
        }
    }, [])

    return component;
}