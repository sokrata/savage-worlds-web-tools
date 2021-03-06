/*

Data here is NOT Licensed under the Creative Commons and is owned by Pinnacle Entertainment Group.

This product references the Savage Worlds game system, available from Pinnacle Entertainment Group at www.peginc.com.
Savage Worlds and all associated logos and trademarks are copyrights of Pinnacle Entertainment Group. Used with permission.
Pinnacle makes no representation or warranty as to the quality, viability, or suitability for purpose of this product.

The entries in this file are from Savage Worlds: Sci-Fi Companion and are owned by Pinnacle Entertainment Group.
*/

function get_same_vehicle_size( selected_size ) {
	for(vehicle_counter = 0; vehicle_counter < vehicle_sizes.length; vehicle_counter++) {
		if( selected_size == vehicle_sizes[vehicle_counter].size)
			return vehicle_sizes[vehicle_counter];
	}

	return 0;
}

var starship_options = Array(
	{
		title: "The Last Parsec Options",
		short_tag: "the-last-parsec",
		description: "Various options from The Last Parsec Sourcebooks starship options ",
		type: "bool"
	}
);

var starship_modifications = Array(
	{
		name: "AMCM",
		description: "Anti-Missile Counter Measures are integrated jammers and decoys. They add +2 to Driving, Piloting or Knowledge (Electronics) rolls made to evade missile attacks.",
		get_max: function(selected_object) { return 1 },
		get_mod_cost: function(selected_object) {
			return 1;
		},
		get_cost: function(selected_object) {
			return 5000 * selected_object.size;
		},
	},
	{
		name: "Armor",
		description: "Increases a ship’s Armor value by +2. Due to the nature of space and the size and shape of starships, all Armor is considered Heavy Armor.",
		get_max: function(selected_object) {  return selected_object.size },
		get_mod_cost: function(selected_object) {
			return 1;
		},
		get_cost: function(selected_object) {
			return 10000 * selected_object.size;
		},
		get_mod_effect: function(selected_object) {
			selected_object.armor++;
			selected_object.armor++;

			selected_object.toughness++;
			selected_object.toughness++;
		}
	},
	{
		name: "Artificial Intelligence",
		description: "The ship’s AI can operate all systems — from locomotion to weapons to opening or closing hatches. It has a skill level of d10 in these tasks, but is an “Extra” and does not receive a Wild Die. The AI does not suffer from multi-action penalties if given simultaneous tasks. In combat, the AI acts on the captain’s Action Card. Giving the AI a short verbal command is a free action.",
		get_max: function(selected_object) { return 1 },
		get_mod_cost: function(selected_object) {
			return 0;
		},
		get_cost: function(selected_object) {
			return 10000 * selected_object.size;
		},
	},
	{
		name: "Aquatic",
		description: "The ship is built to withstand deep pressurization and is equipped with thrusters suitable for use in aqueous mediums, allowing it to function underwater as if it were a submersible. Acc and Top Speed are half a vehicle of equal Size",
		show_with_option: "the-last-parsec",
		get_max: function(selected_object) { return 1 },
		get_mod_cost: function(selected_object) {
			return 2;
		},
		get_cost: function(selected_object) {
			return 5000 * selected_object.size;
		},
		get_mod_effect: function(selected_object) {
			selected_object.watercraft = 1;
			if( selected_object.size > 0) {
				same_vehicle = get_same_vehicle_size(selected_object.size);
				water_ts = 0;
				water_acc = 0;
				if( same_vehicle ) {
					water_ts = Math.ceil(same_vehicle.ts / 2);
					water_acc = Math.ceil(same_vehicle.acc / 2);
				}
				if( water_ts > 0 )
					selected_object.append_extra_notes("Water Top Speed: " + water_ts);
				if( water_acc > 0 )
					selected_object.append_extra_notes("Water Acc: " + water_acc);
			}
		},
		get_weight: function(selected_object) {
			return 0;
		}

	},
	{
		name: "Atmospheric",
		description: "Allows the ship to enter planetary atmospheres. This includes heat shielding and additional work to handle the stress and strain of entry. All starships have vertical take-off and landing (VTOL) capability.",
		get_max: function(selected_object) { return 1 },
		get_mod_cost: function(selected_object) {
			return selected_object.size / 2;
		},
		get_cost: function(selected_object) {
			return 50000 * selected_object.size;
		},
	},
	{
		name: "Bomb Bay",
		description: "Each bomb bay may drop up to four Small, 2 Medium, or 1 Large (or larger) bomb per round at no penalty. All use the same attack roll. Dropping bombs uses the Knowledge (Bombardier) skill.",
		get_max: function(selected_object) { return "u" },
		get_mod_cost: function(selected_object) {
			return 1;
		},
		get_cost: function(selected_object) {
			return 50000;
		},
	},
	{
		name: "Crew Reduction",
		description: "Reduces living space, quarters, and facilities for personnel equal to 20% of the listed Crew for the vessel’s Size, granting Size/4 Mods. If this reduces the Crew to 0, the ship is a fully automated drone",
		get_max: function(selected_object) { return "u" },
		get_mod_cost: function(selected_object) {
			return 0;
		},
		get_cost: function(selected_object) {
			return 10000 * selected_object.size;
		},
		get_mod_effect: function(selected_object) {
			selected_object.mods +=  selected_object.size / 4;
			selected_object.crew -= selected_object.selected_size.crew / 5;
		}
	},
	{
		name: "Crew Space",
		description: "Enough space and facilities for more personnel equal to 20% of the listed Crew for the vessel’s Size. To accommodate even more passengers, use Superstructures instead.",
		get_max: function(selected_object) { return "u" },
		get_mod_cost: function(selected_object) {
			return 1;
		},
		get_cost: function(selected_object) {
			return 100000;
		},
		get_mod_effect: function(selected_object) {
			selected_object.crew += selected_object.selected_size.crew / 5;
		}
	},
	{
		name: "Deflector Screens",
		description: "The vessel is protected by an energy field that deflects incoming ballistic attacks (it has no effect against lasers). Attackers must subtract –2 from their Shooting rolls. Mod cost is 2 for Small to Large ships, and 3 for Huge to Gargantuan vessels.",
		get_max: function(selected_object) { return 1 },
		get_mod_cost: function(selected_object) {
			if( selected_object.size >= 25)
				return 5;
			if( selected_object.size >= 13)
				return 3;
			if( selected_object.size >= 6)
				return 2;

		},
		get_cost: function(selected_object) {
			return 10000 * selected_object.size;
		},
	},
	{
		name: "Electromagnetic Shielding",
		description: "Adds +6 to the ship’s effective Toughness from EMP missiles (see page 25).",
		get_max: function(selected_object) { return "u" },
		get_mod_cost: function(selected_object) {
			return 2;
		},
		get_cost: function(selected_object) {
			return 5000 * selected_object.size;
		},
	},
	{
		name: "FTL Drive",
		description: "This includes both the drive and the navigation system required to use it.",
		get_max: function(selected_object) { return 1 },
		get_mod_cost: function(selected_object) {
			return selected_object.size / 2;
		},
		get_cost: function(selected_object) {
			return 2000000 * selected_object.size;
		},
	},
	{
		name: "FTL Drive, Kalian",
		show_with_option: "the-last-parsec",
		description: "Kalian superluminal drives are considered the most finely crafted faster-than-light drives in the known worlds. They are high-end drives known for durability and dependability. They add +2 to Knowledge (Astrogation) rolls when traveling via “hyperspace.” For more information, see Space Travel on page 69. In addition, if a Kalian FTL system is damaged with a starship critical hit during combat, the Repair roll is only –1 per wound instead of the normal –2.",
		get_max: function(selected_object) { return 1 },
		get_mod_cost: function(selected_object) {
			return selected_object.size / 2;
		},
		get_cost: function(selected_object) {
			return 4000000 * selected_object.size;
		},
	},
	{
		name: "Fuel Pods",
		description: "Each fuel pod increases the vessel’s energy capacity by 50%",
		get_max: function(selected_object) { return "u" },
		get_mod_cost: function(selected_object) {
			return selected_object.size / 2;
		},
		get_cost: function(selected_object) {
			return 100000 * selected_object.size;
		},
		get_mod_effect: function(selected_object) {
			selected_object.energy_capacity +=  selected_object.base_energy_capacity / 2;
		}
	},
	{
		name: "Garage / Hangar",
		description: "A small hangar (or garage or external lift-hooks) can carry up 8 Size points of ship, vehicle, or walker.",
		get_max: function(selected_object) { return "u" },
		get_mod_cost: function(selected_object) {
			return 4;
		},
		get_cost: function(selected_object) {
			return 1000000;
		}
	},
	{
		name: "Linked",
		description: "Up to four direct-fire weapons of the same type may be linked and fired as one, increasing the damage by +2 per weapon and reducing the total number of Mods required. Total all Linked weapons in a set first, then halve their required Mods. (If Linking Fixed weapons, halve the total.)",
		get_max: function(selected_object) { return "u" },
		hidden: 1,
		get_mod_cost: function(selected_object) {
			return 0;
		},
		get_cost: function(selected_object) {
			return 0;
		},
	},
	{
		name: "Mercantile",
		description: "Found only on Huge and Gargantuan ships, this might be a restaurant, commissary, or speciality store. Each generates Size+$1d4K a month for the ship (and the same for the mercantile’s owner). The store has 300 square feet of space. Each additional Mod adds roughly 100 square feet and +$1d4K to revenue.",
		get_max: function(selected_object) { return "u" },
		get_mod_cost: function(selected_object) {
			return 2;
		},
		get_cost: function(selected_object) {
			return 100000;
		},
		is_available: function(selected_object) {
			if(selected_object.size >= 16)
				return true;
			else
				return false;
		}
	},
	{
		name: "Missile Launcher",
		description: "Allows up to four Light or two Heavy (or AT) missiles to be fired at once.",
		get_max: function(selected_object) { return "u" },
		get_mod_cost: function(selected_object) {
			return 1;
		},
		get_cost: function(selected_object) {
			return 50000;
		},
		get_mod_effect: function(selected_object) {
			selected_object.has_missile_launcher = 1;
		}
	},
	{
		name: "Passenger Pod",
		description: "Small and Medium ships only. These are rows of fairly spacious seats with safety harnesses, personal vid-screens, and other amenities designed for short travels (typically less than 24 hours). Each pod seats 10.",
		get_max: function(selected_object) { return "u" },
		get_mod_cost: function(selected_object) {
			return 1;
		},
		get_cost: function(selected_object) {
			return 50000;
		}
	},
	{
		name: "Self-Destruct",
		show_with_option: "the-last-parsec",
		description: "Self-destruct is a mechanism that can cause an object to destroy itself within a predefined set of circumstances. The self-destruct mechanism is usually the most complete way to destroy the object. For that reason the self-destruct mechanism can be used to destroy objects that are meant to be discarded. Most civilian starships do not have a self-destruct mechanism.",
		get_max: function(selected_object) { return 1 },
		get_mod_cost: function(selected_object) {
			return 2;
		},
		get_cost: function(selected_object) {
			return 1000000 * selected_object.size;
		},
	},
	{
		name: "Sensor Suite (Galactic)",
		description: "Light, chemical, motion, and other active sensors allow detection of targets up to one light year away with a Knowledge (Electronics) roll. Within 10K miles, the sensors add +2 to the roll. Illumination penalties are ignored. Targets don’t have to be in direct line of sight, but asteroid or powerful energy fields may cause inaccurate or false readings at the GM’s discretion.",
		get_max: function(selected_object) { return 1 },
		get_mod_cost: function(selected_object) {
			return 2;
		},
		get_cost: function(selected_object) {
			return 1000000;
		}
	},
	{
		name: "Sensor Suite (Planetary)",
		description: "This functions exactly like the Medium Sensor Suite (page 16) but has a range of 10K miles.",
		get_max: function(selected_object) { return 1 },
		get_mod_cost: function(selected_object) {
			return 1;
		},
		get_cost: function(selected_object) {
			return 50000;
		}
	},
	{
		name: "Shields",
		description: "The craft is protected by an ablative energy field that absorbs 10×Size points of damage before it’s depleted. Apply all damage to the shield first, then any left over to the ship (AP counts as usual). Active shields detonate missiles and torpedoes before they hit, reducing their damage total by half. A craft may regenerate its Size in shield points if it makes no attacks in a round.",
		get_max: function(selected_object) { return 1 },
		get_mod_cost: function(selected_object) {
			return selected_object.size / 2;
		},
		get_cost: function(selected_object) {
			return 25000 * selected_object.size;
		},
	},
	{
		name: "Sloped Armor",
		description: "Non-energy, ballistic attacks against this vessel suffer a –2 penalty. It has no effect on energy attacks.",
		get_max: function(selected_object) { return 1 },
		get_mod_cost: function(selected_object) {
			return 2;
		},
		get_cost: function(selected_object) {
			return 5000 * selected_object.size;
		},
	},
	{
		name: "Speed",
		description: "Each purchase increases the ship’s Acc by 5 and Top Speed by 50. (This cannot be taken with Speed Reduction.)",
		get_max: function(selected_object) { return "u" },
		get_mod_cost: function(selected_object) {
			return 1;
		},
		get_cost: function(selected_object) {
			return 100000 * selected_object.size;
		},
		get_mod_effect: function(selected_object) {
			selected_object.ts +=  50;
			selected_object.acc +=  5;
		}
	},
	{
		name: "Speed Reduction",
		description: "The ship trades power and speed for additional room. Each time this is taken, reduce Acc by 5 and Top Speed by 50 to gain half the ship’s Size in Mod slots.",
		get_max: function(selected_object) { return 3 },
		get_mod_cost: function(selected_object) {
			return 0;
		},
		get_cost: function(selected_object) {
			return 0;
		},
		get_mod_effect: function(selected_object) {
			selected_object.ts -=  50;
			selected_object.acc -=  5;
			selected_object.mods += selected_object.size / 2;
		}
	},
	{
		name: "Stealth System",
		description: "Radar-absorbing paint, heat baffles, scramblers, and other devices make the ship difficult to detect by vision or sensors. Those trying to spot, attack, (or lock on to) the ship subtract 4 from their rolls. The effect is triggered as a free action, but is negated any round in which the ship fires a weapon or emits some other non- cloakable signal such as radio signal or active sensor search.",
		get_max: function(selected_object) { return 1 },
		get_mod_cost: function(selected_object) {
			return selected_object.size;
		},
		get_cost: function(selected_object) {
			return 50000 * selected_object.size;
		}
	},
	{
		name: "Superstructure",
		description: "Superstructures are large sections that add great amounts of space to large ships, typically to accommodate more passengers or cargo. Each superstructure adds one to the fuel used per day, consumes 10 regular Mods, and subtracts 1 from the ship’s base Toughness (not Armor) as it reduces overall structural integrity. Choose the type of superstructure from the sidebar below.",
		hidden: 1,
		get_max: function(selected_object) { return "u" },
		get_mod_cost: function(selected_object) {
			return 10;
		},
		get_cost: function(selected_object) {
			return 5000000;
		},
		is_available: function(selected_object) {
			if(selected_object.size >= 12)
				return true;
			else
				return false;
		},
		get_mod_effect: function(selected_object) {
			selected_object.toughness = selected_object.toughness - 1;
		}
	},
	{
		name: "Superstructure (Bulk Cargo)",
		description: "These are massive, open hulls for hauling bulk cargo. This is equivalent to 18 train box-cars, and can handle up to 800,000 cubic feet of cargo (but no more than 1800 tons if the vessel enters atmosphere). Halve the cost if the storage area is a vacuum.",
		get_max: function(selected_object) { return "u" },
		get_mod_cost: function(selected_object) {
			return 10;
		},
		get_cost: function(selected_object) {
			return 5000000;
		},
		is_available: function(selected_object) {
			if(selected_object.size >= 12)
				return true;
			else
				return false;
		},
		get_mod_effect: function(selected_object) {
			selected_object.toughness = selected_object.toughness - 1;
			selected_object.crew += 100;
		}
	},
	{
		name: "Superstructure (Factory)",
		description: "The ship contains processing and manufacturing facilities that can take in raw materials and create new goods (usually those necessary for extended voyages, military operations, or colony survival). This adds 100 Crew. The vessel must also have at least one shuttle per Factory Superstructure to take in raw goods. Each factory can generate 2d6×$100K in goods, supplies, or raw materials a week in an average environment (such as an asteroid field or small planet). Add or subtract a d6 for a sparse / rich find.) Materials can be used to fuel and resupply the ship (and other ships as well).",
		get_max: function(selected_object) { return "u" },
		get_mod_cost: function(selected_object) {
			return 10;
		},
		get_cost: function(selected_object) {
			return 5000000;
		},
		is_available: function(selected_object) {
			if(selected_object.size >= 12)
				return true;
			else
				return false;
		},
		get_mod_effect: function(selected_object) {
			selected_object.toughness = selected_object.toughness - 1;
			selected_object.crew += 100;
		}
	},
	{
		name: "Superstructure (Hangar)",
		description: "A large, dedicated flight bay that holds up to 24 Size points of vehicles, walkers, or Small or Medium ships (Large and greater ships won’t fit due to logarithmic scaling). This includes additional fuel storage, maintenance bays, training rooms, and briefing areas, and adds 50 additional crew members.",
		get_max: function(selected_object) { return "u" },
		get_mod_cost: function(selected_object) {
			return 10;
		},
		get_cost: function(selected_object) {
			return 5000000;
		},
		is_available: function(selected_object) {
			if(selected_object.size >= 12)
				return true;
			else
				return false;
		},
		get_mod_effect: function(selected_object) {
			selected_object.toughness = selected_object.toughness - 1;
			selected_object.crew += 50;
		}
	},
	{
		name: "Superstructure (Passenger, Civilian)",
		description: "Luxury accommodations for long-term travelers, including hydroponic gardens, theatres, gyms, malls, restaurants, shopping, and lodging for 700 passengers and 50 additional staff. Passengers typically pay an average of $200 per day.",
		get_max: function(selected_object) { return "u" },
		get_mod_cost: function(selected_object) {
			return 10;
		},
		get_cost: function(selected_object) {
			return 5000000;
		},
		is_available: function(selected_object) {
			if(selected_object.size >= 12)
				return true;
			else
				return false;
		},
		get_mod_effect: function(selected_object) {
			selected_object.toughness = selected_object.toughness - 1;
		}
	},
	{
		name: "Superstructure (Passenger, Military)",
		description: "Spartan barracks, training facilities, armories, and a few multi- purpose recreational areas for 450 marines and 50 staff (cooks, techs, etc).",
		get_max: function(selected_object) { return "u" },
		get_mod_cost: function(selected_object) {
			return 10;
		},
		get_cost: function(selected_object) {
			return 5000000;
		},
		is_available: function(selected_object) {
			if(selected_object.size >= 12)
				return true;
			else
				return false;
		},
		get_mod_effect: function(selected_object) {
			selected_object.toughness = selected_object.toughness - 1;
		}
	},
	{
		name: "Superstructure (Specialty)",
		description: "This covers anything not detailed above, such as massive medical bays for a hospital ship, research facilities, etc. The specific function determines specifics, but a basic guideline is a Specialty Superstructure houses and services 200 individuals, their equipment, and storage needs.",
		get_max: function(selected_object) { return "u" },
		get_mod_cost: function(selected_object) {
			return 10;
		},
		get_cost: function(selected_object) {
			return 5000000;
		},
		is_available: function(selected_object) {
			if(selected_object.size >= 12)
				return true;
			else
				return false;
		},
		get_mod_effect: function(selected_object) {
			selected_object.toughness = selected_object.toughness - 1;
		}
	},
	{
		name: "Targeting System",
		description: "The ship’s internal sensors and computers are linked to all attached weapons. This compensates for movement, range, multi-actions, and the like, negating up to two points of Shooting penalties.",
		get_max: function(selected_object) { return 1 },
		get_mod_cost: function(selected_object) {
			return 1;
		},
		get_cost: function(selected_object) {
			return 10000  * selected_object.size;
		}
	},
	{
		name: "Teleporter",
		description: "Ultra Tech. Teleporters work by turning physical objects into energy, blasting them through space, and then reconstituting them at the destination. Each teleporter can transport six average size humans at a time, or 1000 pounds of cargo up to 100 miles distant, or up to 1000 miles distant if a linked transmitter is present at the destination.",
		get_max: function(selected_object) { return "u" },
		get_mod_cost: function(selected_object) {
			return 2;
		},
		get_cost: function(selected_object) {
			return 5000000;
		}
	},
	{
		name: "Torpedo Tube",
		description: "Each tube allows up to two Light or one Heavy torpedo to be fired at once (at one or two targets, as desired).",
		get_max: function(selected_object) { return "u" },
		get_mod_cost: function(selected_object) {
			return 1;
		},
		get_cost: function(selected_object) {
			return 500000;
		},
		get_mod_effect: function(selected_object) {
			selected_object.has_torpedo_tube = 1;
		}
	},
	{
		name: "Tractor Beam",
		description: "Tractor beams are specialized starship weapons designed to hold an enemy ship in place and pull it to the “attacker.” Ships can only affect vessels of smaller Size. Their range is quite short (about 1000 yards), so they must get a Short Range result on the Chase table to use the weapon. This is an opposed Knowledge (Electronics) roll at –4 vs the defender’s Piloting (or Knowledge (Electronics) in Large or larger ships). If the attacker is successful, the enemy ship is caught and pulled into contact in 2d6 rounds. A captive’s ship’s life support systems remain active, but all locomotion and weapons are shut down.",
		get_max: function(selected_object) { return "u" },
		get_mod_cost: function(selected_object) {
			return 5;
		},
		get_cost: function(selected_object) {
			return 1000000;
		}
	}
);

var starship_sizes = Array(
	{
		size_label: "Small",
		examples: "Fighters, shuttles",
		size: 6,
		acc: 50,
		ts: 700,
		climb: 3,
		toughness: 20,
		armor: 5,
		mods: 20,
		crew: 1,
		cost: 2000000,
		energy_capacity: 25,
		provisions: 25
	},
	{
		size_label: "Medium",
		examples: "Bombers, large shuttles, scout ships",
		size: 8,
		acc: 45,
		ts: 600,
		climb: 2,
		toughness: 25,
		armor: 6,
		mods: 25,
		crew: 5,
		cost: 5000000,
		energy_capacity: 100,
		provisions: 100
	},
	{
		size_label: "Large",
		examples: "Freighters, corvettes, scientific exploration vessels",
		size: 12,
		acc: 40,
		ts: 500,
		climb: 1,
		toughness: 35,
		armor: 8,
		mods: 30,
		crew: 50,
		cost: 20000000,
		energy_capacity: 300,
		provisions: 300
	},
	{
		size_label: "Huge",
		examples: "Destroyers, bulk freighters, light cruisers",
		size: 16,
		acc: 35,
		ts: 400,
		climb: 0,
		toughness: 45,
		armor: 10,
		mods: 40,
		crew: 300,
		cost: 50000000,
		energy_capacity: 500,
		provisions: 500
	},
	{
		size_label: "Giant",
		examples: "Cruisers, small battleships or carriers",
		size: 20,
		acc: 30,
		ts: 300,
		climb: -1,
		toughness: 50,
		armor: 11,
		mods: 50,
		crew: 1000,
		cost: 200000000,
		energy_capacity: 1000,
		provisions: 1000
	},
	{
		size_label: "Gargantuan",
		examples: "Battleships, carriers",
		size: 24,
		acc: 25,
		ts: 200,
		climb: -2,
		toughness: 55,
		armor: 13,
		mods: 70,
		crew: 3000,
		cost: 1000000000,
		energy_capacity: 2000,
		provisions: 2000
	},
	{
		size_label: "Behemoth",
		examples: "Dreadnoughts, invasion carriers.",
		size: 28,
		acc: 20,
		ts: 200,
		climb: -3,
		toughness: 60,
		armor: 15,
		mods: 90,
		crew: 8000,
		cost: 5000000000,
		energy_capacity: 2000,
		provisions: 2000
	},
	{
		size_label: "Leviathan",
		examples: "Super dreadnoughts, super carriers, settlement ships.",
		size: 32,
		acc: 20,
		ts: 200,
		climb: -4,
		toughness: 70,
		armor: 20,
		mods: 120,
		crew: 20000,
		cost: 10000000000,
		energy_capacity: 2000,
		provisions: 2000
	},
	{
		size_label: "World Killer",
		examples: "Mega dreadnoughts, mega carriers, colony ships.",
		size: 40,
		acc: 20,
		ts: 200,
		climb: -5,
		toughness: 80,
		armor: 25,
		mods: 150,
		crew: 50000,
		cost: 30000000000,
		energy_capacity: 2000,
		provisions: 2000
	}

);
