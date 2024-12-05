import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';

export function ContactInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="">
          <MapPin className="" />
          <div>
            <h3 className="">Address</h3>
            <p className="">
              Institute of Technology, University of Moratuwa
              <br />
              Diyagama, Homagama
              <br />
              Sri Lanka
            </p>
          </div>
        </div>
        <div className="">
          <Mail className="" />
          <div>
            <h3 className="">Email</h3>
            <p className="">
              gavelclub@itum.mrt.ac.lk
            </p>
          </div>
        </div>
        <div className="">
          <Phone className="" />
          <div>
            <h3 className="">Phone</h3>
            <p className="">+94 11 2XXX XXX</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}