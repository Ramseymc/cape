-- get units avail for selected block
set @var_selectedSubsection = 'Block C';

select 
	u.unitName 
from units u 
LEFT join subsection s on s.id = u.subsection 
LEFT join salesinfo si on si.unit = u.unitName AND si.block = s.subsectionName 
WHERE u.unitName NOT IN 
	( select 
		u.unitName 
	  from units u join subsection s on s.id = u.subsection 
	  join salesinfo si on si.unit = u.unitName AND si.block = s.subsectionName 
	  where s.subsectionName = @var_selectedSubsection ) 
and s.subsectionName = @var_selectedSubsection