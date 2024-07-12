import React from "react";
import UserPageTitle from "../../components/comman/UserPageTitle";
import ProfileForm from "../../components/user/profile/ProfileForm";

function Profile() {
  return (
    <div className="p-8">
      <UserPageTitle title="Profile" />
      <ProfileForm />
    </div>
  );
}

export default Profile;
