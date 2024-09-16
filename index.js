const fs = require('fs');
const fileAPath = 'following.json';
const fileBPath = 'followers.json';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

function extractValues(jsonFile) {
  let values = [];
  jsonFile.relationships_following.forEach(relationship => {
    relationship.string_list_data.forEach(item => {
      const dateFollowed = new Date(item.timestamp * 1000);
      const formattedDate = dateFollowed.toLocaleDateString("en-US");
      values.push(`${GREEN}${item.value}${RESET} (${YELLOW}your following on: ${formattedDate}${RESET})`);
    });
  });
  
  return values;
}
function compareFiles(fileAPath, fileBPath) {
  const fileAContent = fs.readFileSync(fileAPath, 'utf-8');
  const fileBContent = fs.readFileSync(fileBPath, 'utf-8');

  const jsonFileA = JSON.parse(fileAContent);
  const jsonFileB = JSON.parse(fileBContent);

  const valuesA = extractValues(jsonFileA);
  const valuesB = extractValues(jsonFileB).map(value => value.split(' ')[0]);

  const uniqueToA = valuesA.filter(value => {
    const accountName = value.split(' ')[0];
    return !valuesB.includes(accountName);
  });

  if (uniqueToA.length > 0) {
    console.log(`Here is the list, sir.`);
    uniqueToA.forEach(account => console.log (account));
  } else {
    console.log("All your following, following you back sir.");
  }
}

compareFiles(fileAPath, fileBPath);
