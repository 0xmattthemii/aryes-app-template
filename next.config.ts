import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import "@/lib/env";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withPayload(nextConfig);
