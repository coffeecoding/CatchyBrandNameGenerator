import { NextApiRequest } from "next";

function timestamp() {
  var date = new Date().toISOString();
  return date.slice(0, 10) + " " + date.slice(11, 19);
}

export default async function handler(req: NextApiRequest, res) {
  console.log(
    "analytics " + timestamp() + ": checked domain '" + req.body + "'"
  );
  res.status(200).json();
}
