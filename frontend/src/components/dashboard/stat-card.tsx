import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface Props {
  title: React.ReactNode | String;
  icon: React.ReactNode;
  stat: React.ReactNode | String;
  commentary: React.ReactNode | String;
}

const StadisticCard = ({ title, icon, stat, commentary }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stat}</div>
        <p className="text-xs text-muted-foreground">{commentary}</p>
      </CardContent>
    </Card>
  );
};

export default StadisticCard;
