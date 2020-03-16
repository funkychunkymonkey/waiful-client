import AppleHealthKit from 'rn-apple-healthkit';

export default function DailyDistance(props) {
  const PERMS = AppleHealthKit.Constants.Permissions;

  const options = {
    permissions: {
      read: [PERMS.DistanceWalkingRunning],
    },
  };

  AppleHealthKit.initHealthKit(options, (err, results) => {
    if (err) {
      console.log('error initializing Healthkit: ', err);
    } else {
      console.log(results);
    }
  });

  const optionDistance = {
    startDate: new Date(
      props.today.getFullYear(),
      props.today.getMonth(),
      props.today.getDate() - 1,
    ).toISOString(),
    endDate: props.today.toISOString(),
  };

  AppleHealthKit.getDailyDistanceWalkingRunningSamples(
    optionDistance,
    (err, results) => {
      const sum = results.reduce((ac, cl) => ac + cl.value, 0);
      if (err) {
        console.log('DisntanceErr', err);
        return;
      } else {
        props.setWalk({km: Math.ceil(sum / 1000), date: props.today});
      }
    },
  );
}
