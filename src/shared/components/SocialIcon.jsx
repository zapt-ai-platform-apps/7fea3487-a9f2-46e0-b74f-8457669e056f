import React from 'react';
import { FaTwitter, FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa';

export default function SocialIcon({ platform }) {
  switch (platform?.toLowerCase()) {
    case 'twitter':
    case 'x':
      return <FaTwitter className="text-blue-400" />;
    case 'instagram':
      return <FaInstagram className="text-pink-500" />;
    case 'tiktok':
      return <FaTiktok className="text-black" />;
    case 'facebook':
      return <FaFacebook className="text-blue-600" />;
    default:
      return null;
  }
}