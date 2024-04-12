import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

const GET = ({ context }: LoaderFunctionArgs) => {
  return { status: 200, json: { message: "GET request", ctx: context } };
};

const POST = ({ context }: ActionFunctionArgs) => {
  return { status: 200, json: { message: "POST request", ctx: context } };
};

export const loader = GET;
export const action = POST;
