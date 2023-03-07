import { useState } from "react";
import {
  Typography,
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
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { useNavigate } from "react-router-dom";
import ButtonC from "@/components/ButtonC";
 
export function Survey() {
    const [data, setData] = useState();
    const navigate = useNavigate();

    const handleChange = (data) => {
      setData(data)
        console.log(data);
    };
     
  return (
    <div className="mt-12">
      <ButtonC onClick={() => navigate('/survey/create-survey')}>Create Survey</ButtonC>
        {/* <ReactFormBuilder
            edit
            customToolbarItems={items}
            onPost={handleChange}
        /> */}
    </div>
  );
}

export default Survey;
