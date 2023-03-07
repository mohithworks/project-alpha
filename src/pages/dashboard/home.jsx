import React from "react";
import {
  Alert ,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Typography,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import { Link, NavLink } from "react-router-dom";

export function Home() {
  return (
    <div className="mt-12">
      <Alert variant="gradient">
        Added survey functionality
        <Link to="/dashboard/survey" className="flex flex-row items-center">
          <Typography
            variant="h6"
            color={"blue-gray"}
          >
            Click here to view
          </Typography>
        </Link>
      </Alert>
    </div>
  );
}

export default Home;
