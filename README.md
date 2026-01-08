# ror2-dmg-calculator
Tool to calculate the damage, potential proc chains, and potential DPS of all base game items in Risk of Rain 2.

This calculator currently assumes the best possible conditions - that is, all random checks pass, all enemies are boss enemies, all enemies are above 90% health, etc. This means that damage calculations may not be entirely useful in context of the game - for example, it is possible for a Bundle oF Fireworks => Ukulele => ATG proc chain to happen, but has a meager .5% (.25 * .2 * .10) chance to occur per rocket. Certainly possible -- and probable given a long enough run -- but not reliable as a consistent DPS calculation. All calculations list the probability at each step of the proc chain.

## How items are categorized
An index of each damaging item in the game can be found in items.json. Each item has a set of traits, depending on the item:
- name
- damage
    - All damage is listed by %. For items of priority 1, it represents % base damage. For all other items, it represents % TOTAL damage.
    - An item's damage listing represents its base damage, with a single stack of the item.
- proc-chance
    - How likely an item is to trigger upon hit, assuming the initiating attack has a 1.0 proc coefficient. For example, ATG has a proc chance of 10%.
    - Dual-scaling items have their own unique traits.
- stack-type
    - How an item's statistics change as a player collects more of each item. For example, an extra stack of ATG increases TOTAL damage %, while an extra stack of Sticky Bomb increases its proc chance.
- stack
    - The numerical value indicating how much an extra stack impacts the item. For example, a stack of ATG increases TOTAL damage by 300%, while an extra stack of Sticky Bomb increases proc chance by 5%.
- priority
    - Where in a proc chain the damage is applied. The explanation for this is a bit long-winded, so it has its own section later on. Just know that it has to do with HOW an item's damage scaling interacts with both a base attack and the items it triggers.


## Priority
Each item has its own priority level, based on how its damage is applied.

- Items with priority zero (Crowbar, Delicate Watch, etc.) apply a % increase to the base attack. All priority zero multipliers are applied at the beginning of an attack, which other items then scale off of.

- Items with priority one (Fireworks, Shuriken, etc.) are items that initiate an attack or proc chain. These items have their own base dmg % multipliers, and are counted as the "base" of a proc chain. There can only be a single priority one item in a proc chain - this calculator automatically assumes the one with the highest base damage, even if it may not yield the highest DPS in a real build.

- Items with priority two (Ukulele, ATG, Perferators) are proc items - these items are TRIGGERED by other attacks (either those triggered by priority one items or priority two items). They have a % chance to proc, but are assumed to succeed for the sake of damage calculation.

- Items with priority three (Runald's/Kjaro's Bands, Sticky Bomb) are FINAL items - these items can only be triggered by items with priority one or two, but cannot trigger other items, usually due to their own proc coefficient of zero. These determine the final damage calculation of each attack. Multiple priority 3 triggers can happen at the same time in a proc chain.