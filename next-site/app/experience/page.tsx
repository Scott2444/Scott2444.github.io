"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { NavBar, ContactMe } from "../components";

export default function Home() {
  return (
    <>
      <NavBar />
      <ContactMe />
    </>
  );
}