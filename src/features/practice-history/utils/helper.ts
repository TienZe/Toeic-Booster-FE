import { PracticeHistory } from "../types/PracticeHistory";

// function groupPracticeByTest(practices: PracticeHistory[]) {
//   return Object.values(
//     practices.reduce(
//       (grouped, practice) => {
//         if (!practice.test) return grouped;
//         if (practice.test) {
//           const key = practice.test.id;
//           if (!grouped[key]) {
//             grouped[key] = []; // Tạo nhóm mới nếu chưa tồn tại
//           }
//           grouped[key].push(practice);
//         }

//         return grouped;
//       },
//       {} as Record<string, PracticeHistory[]>,
//     ),
//   );
// }

function groupPracticeByTest(practices: PracticeHistory[]) {
  const grouped = practices.reduce(
    (acc, practice) => {
      if (practice.test) {
        const key = practice.test.id;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(practice);
      }
      return acc;
    },
    {} as Record<string, PracticeHistory[]>,
  );

  return Object.entries(grouped).map(([id, value]) => ({
    id,
    name: value[0]?.test?.name || "Unknown Test",
    value,
  }));
}

export { groupPracticeByTest };
