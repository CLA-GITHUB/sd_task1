export const question1 = `select polling_unit.polling_unit_name as polling_unit_name, lga.lga_name as lga, announced_pu_results.party_abbreviation as party_abbreviation, announced_pu_results.party_score as party_score
              from announced_pu_results
              left join polling_unit on announced_pu_results.polling_unit_uniqueid = polling_unit.uniqueid
              left join lga on polling_unit.lga_id = lga.lga_id
              order by lga;
              `;

export const question3 = (body: any) => {
  const {
    polling_unit_uniqueid,
    party_abbreviation,
    party_score,
    entered_by_user,
    date_entered,
    user_ip_address,
  } = body;
  return `

    INSERT INTO announced_pu_results (polling_unit_uniqueid, party_abbreviation, party_score, entered_by_user, date_entered, user_ip_address) 
    VALUES ( "${polling_unit_uniqueid}"," ${party_abbreviation}"," ${party_score}", "${entered_by_user}", "${date_entered
    .toString()
    .split("T")
    .join(" ")}"," ${user_ip_address.toString()}");
    `;
};
