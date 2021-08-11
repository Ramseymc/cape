/* these are the blocks / units that are unavail */ 
select u.unitName, s.subsectionName from units u join subsection s on s.id = u.subsection join salesinfo si on si.unit = u.unitName AND si.block = s.subsectionName 
/* join this via a subquery ? or a left join to get those units which are availble for the given subsection/subsectionName */