import axios from 'axios';
import { PostData } from "../../../../service/types";
import { useGetForms } from "../../../../service/services";

const savePostForm = {
  tenant: '',
  form:'',
  date:'',
  status:'',
  channels: ["email"],
  data: {name: '', email: '', phone: '', message: ''}
};

export default function NewPost() {
    
}