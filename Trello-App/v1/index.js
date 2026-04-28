const users = [];
const organizations = [
 // {
  //   id: 1,
  //   title: "Dev dot",
  //   descreption: "slhfsdlhf",
  //   admin: 1,
  //   members: [1],
  // },
];
const boards = [
  // {
  //   id: 1,
  //   title: "Job get sit here",
  //   organization: 1,
  // },
];
const issues = [
  // {
  //   id: 1,
  //   title: "add more features",
  //   organizationId: 1,
  // },
];
//
function createJWT(id) {
  return jwt.sign({ userId: id }, "secret", { expiresIn: "7d" });
}
//imports
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authMiddleware from "./middleware.js";
const app = express();
app.use(express.json());
//ids

let id = 1;
let organization_id = 1;
let board_id = 1;
let issue_id = 1;
//signup

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const userExist = users.find((user) => (user.email == email));
  if (userExist) {
    res.status(400).json({
      success: false,
      messgae: "User already exists",
      users,
    });
    return;
  }
  if (users.length > 0) {
    id = users[users.length - 1].id + 1;
  }
  const salt = 10;
  const hashedPassword = bcrypt.hashSync(password, salt);
  const user = {
    id,
    name,
    email,
    password: hashedPassword,
  };
  users.push(user);
  return res.json({
    success: true,
    message: "You are Registred",
    user,
  });
});
//login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);
  const token = createJWT(user.id);
  if (!user) {
    res.status(411).json({
      success: false,
      message: "Successfully Login ✅",
      token,
    });
    return;
  }
const isMatch = bcrypt.compareSync(password, user.password);

if (!isMatch) {
  return res.status(401).json({ message: "Invalid password" });
}
  if (user) {
    res.status(200).json({
      success: true,
      message: "Successfully Login ✅",
      token,
    });
    return;
  }
});
//organization
app.post("/organization", authMiddleware, (req, res) => {
  const userId = req.userId;
  const { title, descreption } = req.body;
  // // id: 1,
  //   title: "Dev dot",
  //   descreption: "slhfsdlhf",
  //   admin: 1,
  //   members: [1],
  if (organizations.length > 0) {
    organization_id =
      organizations[organizations.length - 1].organization_id + 1;
  }
  const organization = {
    id: organization_id,
    title,
    descreption,
    admin: userId,
    members: [],
  };
  organizations.push(organization)
  res.status(200).json({
    success:true,
    message:"Organizaion created ✅"
  })
});
//add member to organization
app.post("/add-member-to-organization", authMiddleware, (req, res) => {
  const userId = req.userId;
  const { organizationId, memberUserEmail } = req.body;

  const organization = organizations.find((organization) => {
    return organization.id === organizationId;
  });

  if (!organization || organization.admin !== userId) {
    res.status(403).json({
      success: false,
      message: "Organization does not exist Or User is not Admin",
    });
    return;
  }
  const memberUser = users.find((user) => {
    return user.email === memberUserEmail;
  });
  if (!memberUser) {
    res.status(401).json({
      success: false,
      message: "Member You want to Invite Does Not exists",
    });
    return;
  }
  if (!organization.members.includes(memberUser.id)) {
    organization.members.push(memberUser.id);
  }

  res.status(200).json({
    success: false,
    message: "New Member 🤖 added",
    memberUser,
  });
});
//create board
app.post("/board", authMiddleware, (req, res) => {
  const userId = req.userId;
  const { title, organizationId } = req.body;

  const organization = organizations.find(
    (org) => org.id === organizationId
  );

  if (!organization || !organization.members.includes(userId)) {
    return res.status(403).json({
      success: false,
      message: "Not allowed to create board",
    });
  }

  if (boards.length > 0) {
    board_id = boards[boards.length - 1].id + 1;
  }

  const board = {
    id: board_id,
    title,
    organization: organizationId,
  };

  boards.push(board);

  res.status(200).json({
    success: true,
    message: "Board created ✅",
    board,
  });
});
//create issue
app.post("/issue", authMiddleware, (req, res) => {
  const userId = req.userId;
  const { title, organizationId, boardId } = req.body;

  const organization = organizations.find(
    (org) => org.id === organizationId
  );

  if (!organization || !organization.members.includes(userId)) {
    return res.status(403).json({
      success: false,
      message: "Not allowed to create issue",
    });
  }

  if (issues.length > 0) {
    issue_id = issues[issues.length - 1].id + 1;
  }

  const issue = {
    id: issue_id,
    title,
    organizationId,
    boardId,
    status: "todo", // 🔥 important
  };

  issues.push(issue);

  res.status(200).json({
    success: true,
    message: "Issue created 🐞",
    issue,
  });
});
// READ End Points
// get all boards
app.get("/boards", authMiddleware, (req, res) => {
  const userId = req.userId;

  // find orgs where user is member
  const userOrgIds = organizations
    .filter((org) => org.members.includes(userId))
    .map((org) => org.id);

  const userBoards = boards.filter((board) =>
    userOrgIds.includes(board.organization)
  );

  res.status(200).json({
    success: true,
    boards: userBoards,
  });
});
//issues
app.get("/issue", authMiddleware, (req, res) => {
  const userId = req.userId;
  const { boardId } = req.query;

  const userOrgIds = organizations
    .filter((org) => org.members.includes(userId))
    .map((org) => org.id);

  let userIssues = issues.filter((issue) =>
    userOrgIds.includes(issue.organizationId)
  );

  if (boardId) {
    userIssues = userIssues.filter(
      (issue) => issue.boardId == boardId
    );
  }

  res.status(200).json({
    success: true,
    issues: userIssues,
  });
});
//members
app.get("/members", authMiddleware, (req, res) => {
  const { organizationId } = req.query;

  const organization = organizations.find(
    (org) => org.id == organizationId
  );

  if (!organization) {
    return res.status(404).json({
      success: false,
      message: "Organization not found",
    });
  }

  const members = users.filter((user) =>
    organization.members.includes(user.id)
  );

  res.status(200).json({
    success: true,
    members,
  });
});
// remove issue form one stage to another stage
app.put("/issue", authMiddleware, (req, res) => {
  const userId = req.userId;
  const { issueId, status } = req.body;

  const issue = issues.find((i) => i.id === issueId);

  if (!issue) {
    return res.status(404).json({
      success: false,
      message: "Issue not found",
    });
  }

  const organization = organizations.find(
    (org) => org.id === issue.organizationId
  );

  if (!organization || !organization.members.includes(userId)) {
    return res.status(403).json({
      success: false,
      message: "Not allowed",
    });
  }

  const validStatus = ["todo", "in-progress", "done"];

  if (!validStatus.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status",
    });
  }

  issue.status = status;

  res.status(200).json({
    success: true,
    message: "Issue updated 🚀",
    issue,
  });
});

//listening the app
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running :${PORT} 🟦 | http://localhost:${PORT}`);
});
