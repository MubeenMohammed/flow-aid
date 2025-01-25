import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  Users,
  ChevronDown,
  Activity,
  Clipboard,
  Heart,
  Phone,
  Calendar,
} from "lucide-react";

const FullPageWaiting = () => {
  const data = {
    waitingCount: 25,
    longestWaitTime: 240,
    patients: [
      {
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
    ],
  };

  const patient = data.patients[0];
  const estimatedWait = patient.triage_category * 30 - patient.time_elapsed;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Top Banner */}
      <div className="bg-blue-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="text-white" />
            <h1 className="text-xl font-semibold">City General Hospital</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Phone size={20} />
            <span>Emergency: 911</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Left Column - Patient Info */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clipboard size={20} />
              <span>Patient Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Patient ID</p>
              <p className="font-semibold">{patient.id}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Arrival Time</p>
              <p className="font-semibold">
                <Calendar
                  className="inline mr-2"
                  size={16}
                />
                {new Date(patient.arrival_time).toLocaleTimeString()}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Triage Category</p>
              <p className="font-semibold">Level {patient.triage_category}</p>
            </div>
          </CardContent>
        </Card>

        {/* Middle Column - Wait Time Info */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Current Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Clock
                  className="text-blue-500"
                  size={24}
                />
                <div>
                  <p className="text-sm text-gray-500">Time Waited</p>
                  <p className="text-2xl font-bold">
                    {patient.time_elapsed} mins
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users
                  className="text-blue-500"
                  size={24}
                />
                <div>
                  <p className="text-sm text-gray-500">Your Position</p>
                  <p className="text-2xl font-bold">
                    {patient.queue_position.global} of {data.waitingCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <h3 className="font-semibold mb-2">Estimated Wait Time</h3>
              <p className="text-4xl font-bold text-blue-600">
                {estimatedWait} minutes
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Based on your triage category
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Current Progress</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 bg-green-50 p-3 rounded">
                  <Activity className="text-green-500" />
                  <span>Triage completed</span>
                </div>
                {patient.status.investigations.labs === "pending" && (
                  <div className="flex items-center space-x-2 bg-amber-50 p-3 rounded">
                    <ChevronDown className="text-amber-500" />
                    <span>Lab tests pending</span>
                  </div>
                )}
                {patient.status.investigations.imaging === "ordered" && (
                  <div className="flex items-center space-x-2 bg-amber-50 p-3 rounded">
                    <ChevronDown className="text-amber-500" />
                    <span>Imaging ordered</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Section - Calming Content */}
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>While You Wait</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROU7r5FcpAGL7l5JnnlCc1UOtaxCBcVMU1Hw&s"
                  alt="Calming hospital garden"
                  className="w-full rounded-lg"
                />
                <p className="text-gray-600">
                  Our healing garden provides a peaceful environment for
                  patients and families. Take a moment to breathe and relax -
                  we'll notify you when it's your turn.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hospital Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <img
                  src="/api/placeholder/600/300"
                  alt="Hospital cafe"
                  className="w-full rounded-lg"
                />
                <ul className="space-y-2 text-gray-600">
                  <li>• Café open 24/7 on ground floor</li>
                  <li>• Free WiFi available</li>
                  <li>• Prayer room on 2nd floor</li>
                  <li>• Vending machines near waiting area</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FullPageWaiting;
