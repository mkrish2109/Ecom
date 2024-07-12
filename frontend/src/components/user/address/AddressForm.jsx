import { Button, Card, Label, TextInput } from "flowbite-react";
import React from "react";

function AddressForm() {
  return (
    <div>
      <Card className="w-[400px]">
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="line1" value="Address Line 1" />
            </div>
            <TextInput
              id="line1"
              type="text"
              placeholder="Address line 1"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="line2" value="Address Line 2" />
            </div>
            <TextInput
              id="line2"
              type="text"
              placeholder="Address line 2"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="state" value="State" />
            </div>
            <TextInput id="state" type="text" placeholder="State" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="city" value="City" />
            </div>
            <TextInput id="city" type="text" placeholder="City" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="pincode" value="Pin Code" />
            </div>
            <TextInput
              id="pincode"
              type="text"
              placeholder="E.g. 321654"
              required
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </div>
  );
}

export default AddressForm;
