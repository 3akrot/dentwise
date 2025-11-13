import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircleIcon, Check, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Doctor, Gender } from "@/lib/generated/prisma/client";
import { DoctorInput } from "@/lib/actions/doctors";
import { formatPhoneNumber } from "@/lib/utils";
import { useCreateDoctor } from "@/hooks/use-doctors";
import { Spinner } from "../ui/spinner";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AddDoctorDialog() {
  const [newDoctor, setNewDoctor] = useState<DoctorInput>({
    name: "",
    email: "",
    gender: "male" as Gender,
    isactive: true,
    phone: "",
    speciality: "",
  });
  const { isPending, mutate , data} = useCreateDoctor();
  console.log(newDoctor);
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="flex items-center ">
            <PlusIcon className="size-4 "></PlusIcon> Add Doctor
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Doctor</DialogTitle>
            <DialogDescription>
              Add a new doctor to your practice
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name *</Label>
                <Input
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, name: e.target.value })
                  }
                  id="name-1"
                  name="name"
                  placeholder="Dr. Pedro Duarte"
                  defaultValue=""
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="specilaity-1">Specilaity *</Label>
                <Input
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, speciality: e.target.value })
                  }
                  id="specilaity-1"
                  name="name"
                  placeholder="General dentisty"
                  defaultValue=""
                />
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email-1">Email *</Label>
              <Input
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, email: e.target.value })
                }
                id="email-1"
                name="email"
                placeholder="example@gmail.com"
                defaultValue=""
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone-1">Phone Number</Label>
              <Input
                value={newDoctor.phone}
                onChange={(e) =>
                  setNewDoctor({
                    ...newDoctor,
                    phone: formatPhoneNumber(e.target.value) ?? "",
                  })
                }
                id="phone-1"
                name="phone"
                placeholder="(+2) 011 245 552 46"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Select
              onValueChange={(e) =>
                setNewDoctor({ ...newDoctor, gender: e as Gender })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(e) =>
                setNewDoctor({
                  ...newDoctor,
                  isactive: e == "active" ? true : false,
                })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue defaultValue={"active"} placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="not active">Not Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            {isPending ? (
              <Button variant={'outline'} disabled>
                <Spinner></Spinner>
                adding doctor
              </Button>
            ) : (
              <Button
                disabled={
                  !newDoctor.name || !newDoctor.email || !newDoctor.speciality
                }
                onClick={() => {
                  mutate(newDoctor)
                }}
                type="submit"
              >
                Save changes
              </Button>
            )}

          </DialogFooter>
          {
            (data && data.success) &&
            <Alert variant={'default'}>
              <Check/>
              <AlertTitle>
                Succesfully added new doctor
              </AlertTitle>
            </Alert>
          }
          {
            (data && data.message) &&
            <Alert variant={'destructive'}>
              <AlertCircleIcon />
              <AlertTitle>
                A doctor with the same email exists
              </AlertTitle>
            </Alert>
          }
        </DialogContent>
      </form>
    </Dialog>
  );
}
