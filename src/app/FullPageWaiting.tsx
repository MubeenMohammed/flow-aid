import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Users,
  Activity,
  Clipboard,
  Heart,
  Calendar,
  Image as ImageIcon,
  TestTube,
} from "lucide-react";
import { Link } from "react-router-dom";
import Patientchat from "./chat/PatientChat";
import { Button } from "@/components/ui/button";
import { toggleSmsfeatureOff } from "@/backend_calls/api_calls";

// Separate components for better organization
const StatusBadge = ({ status }: { status: string }) => {
  const colors = {
    pending: "bg-amber-100 text-amber-800 border-amber-200",
    ordered: "bg-amber-100 text-amber-800 border-amber-200",
    complete: "bg-green-100 text-green-800 border-green-200",
  };

  return (
    <Badge
      variant="outline"
      className={`${colors[status as keyof typeof colors]} ml-auto`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const InfoBlock = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon?: any;
}) => (
  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
    <div className="flex items-center gap-3">
      {Icon && (
        <Icon
          className="text-blue-600"
          size={20}
        />
      )}
      <div className="flex-1">
        <p className="text-sm text-blue-600 font-medium">{label}</p>
        <p className="text-lg font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  </div>
);

const QueueAnimation = () => (
  <div className="relative h-24 bg-blue-50/50 rounded-lg overflow-hidden flex items-center justify-center">
    <img
      src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHh0M3U2NDB5bmJmenA0MHJwMHFyMm42cWN1Ymx4NXF5czM3aXpnZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Rk2vpkjp446amkIwIz/giphy.gif"
      alt="Queue animation"
      className="h-20 object-contain"
    />
  </div>
);

const FullPageWaiting = () => {
  const data = {
    waitingCount: 25,
    longestWaitTime: 240,
    patientData: {
      id: "anon_1234",
      arrival_time: "2024-12-30T10:00:00",
      triage_category: 3,
      queue_position: {
        global: 5,
        category: 2,
      },
      status: {
        current_phase: "triaged",
        investigations: {
          labs: "pending",
          imaging: "ordered",
        },
      },
      time_elapsed: 45,
    },
  };

  const userData = localStorage.getItem("user");
  const localStoragedata = userData ? JSON.parse(userData) : null;
  if (localStoragedata) {
    data.patientData.arrival_time = localStoragedata.arrival_time;
    data.patientData.id = localStoragedata.id;
    data.patientData.queue_position = localStoragedata.queue_position;
    data.patientData.status = localStoragedata.status;
    data.patientData.time_elapsed = localStoragedata.time_elapsed;
    data.patientData.triage_category = localStoragedata.triage_category;
  }
  const patient = data.patientData;

  const waitTimes: { [key: number]: number } = {
    1: 0,
    2: 25,
    3: 76,
    4: 143,
    5: 176,
  };

  const estimatedWait = waitTimes[patient.triage_category];

  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      <header className="w-full bg-white border-b shadow-sm">
        <div className="w-full">
          <div className="flex justify-between items-center h-14 px-4">
            <div className="flex items-center space-x-2">
              <Heart
                className="text-blue-600"
                size={24}
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Flow-Aid
              </h1>
            </div>
            <nav className="flex space-x-8">
              <Button
                onClick={() => {
                  localStorage.clear();
                  toggleSmsfeatureOff(patient.id);
                }}
              >
                <Link to="/">Logout</Link>
              </Button>
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-800 px-3 py-2 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/games"
                className="text-gray-600 hover:text-gray-800 px-3 py-2 font-medium transition-colors"
              >
                Games
              </Link>
              <Link
                to="/mindful"
                className="text-gray-600 hover:text-gray-800 px-3 py-2 font-medium transition-colors"
              >
                Mindful Moments
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex-1 w-full ">
        <div className="flex gap-3 w-full h-[calc(100vh-3.5rem)]">
          {/* Left Section - 65% */}
          <div className="w-[75%] p-4 space-y-4">
            {/* Patient Info Card */}
            <Card className="shadow-sm">
              <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-white py-3">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Clipboard size={20} />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-6">
                  <InfoBlock
                    label="Patient ID"
                    value={patient.id}
                    icon={Clipboard}
                  />
                  <InfoBlock
                    label="Arrival Time"
                    value={new Date(patient.arrival_time).toLocaleTimeString()}
                    icon={Calendar}
                  />
                  <InfoBlock
                    label="Triage Level"
                    value={`Level ${patient.triage_category}`}
                    icon={Activity}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Queue Status Card */}
            <Card className="shadow-sm">
              <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-white py-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Users size={20} />
                    Queue Status
                  </CardTitle>
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 rounded-lg text-white">
                    <p className="text-sm font-medium">Estimated Wait</p>
                    <p className="text-2xl font-bold">{estimatedWait} mins</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <QueueAnimation />
                  <div className="grid grid-cols-2 gap-4">
                    <InfoBlock
                      label="Your Position"
                      value={`${patient.queue_position.global} of ${data.waitingCount}`}
                      icon={Users}
                    />
                    <InfoBlock
                      label="Time Waited"
                      value={`${patient.time_elapsed} mins`}
                      icon={Clock}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Treatment Progress Card */}
            <Card className="shadow-sm">
              <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-white py-3">
                <CardTitle className="text-blue-800">
                  Treatment Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity
                        className="text-green-500"
                        size={20}
                      />
                      <h3 className="font-semibold text-green-800">Triage</h3>
                    </div>
                    <StatusBadge status="complete" />
                  </div>

                  <div className="flex flex-col p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <TestTube
                        className="text-blue-500"
                        size={20}
                      />
                      <h3 className="font-semibold text-blue-800">
                        Laboratory
                      </h3>
                    </div>
                    <StatusBadge
                      status={
                        patient.status.investigations
                          ? patient.status.investigations.labs
                          : "Do not required"
                      }
                    />
                  </div>

                  <div className="flex flex-col p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <ImageIcon
                        className="text-blue-500"
                        size={20}
                      />
                      <h3 className="font-semibold text-blue-800">Imaging</h3>
                    </div>
                    <StatusBadge
                      status={
                        patient.status.investigations
                          ? patient.status.investigations.imaging
                          : "Do not required"
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section - Chat - 35% */}
          <div className="w-[25%] flex-end">
            <Patientchat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPageWaiting;
