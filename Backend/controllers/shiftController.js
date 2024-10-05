const xlsx = require('xlsx');
const path = require('path');

const workbookPath = path.join(__dirname, '../excel/shifts.xlsx');
const sheetToJSON = (sheet) => xlsx.utils.sheet_to_json(sheet, { raw: false });

exports.getShifts = (req, res) => {
    const workbook = xlsx.readFile(workbookPath);
    const peopleSheet = workbook.Sheets['People'];
    const backupsSheet = workbook.Sheets['Backups'];
    try {
        const people = sheetToJSON(peopleSheet);
        const backups = sheetToJSON(backupsSheet);

        res.status(200).json({ people, backups });
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: 'Error reading shifts data' });
    }
};

exports.addPersonAndBackup = (req, res) => {
    console.log("Here!")
    const { name, leaves, backupName, shifts, backupLeaves, backupShifts } = req.body;
    console.log("name, leaves, backupName, shifts, backupLeaves, backupShifts", name, leaves, backupName, shifts, backupLeaves, backupShifts)

    const workbook = xlsx.readFile(workbookPath);
    const peopleSheet = workbook.Sheets['People'];
    const backupsSheet = workbook.Sheets['Backups'];

    try {
        const people = sheetToJSON(peopleSheet);
        const newPersonId = people.length + 1;

        const newPerson = {
            ID: newPersonId,
            Name: name,
            Leaves: JSON.stringify(leaves),
            Shifts: shifts.join(',')
        };

        people.push(newPerson);

        const updatedPeopleSheet = xlsx.utils.json_to_sheet(people);
        workbook.Sheets['People'] = updatedPeopleSheet;

        const backups = sheetToJSON(backupsSheet);
        const newBackup = {
            Person_ID: newPersonId,
            Name: backupName,
            Leaves: JSON.stringify(backupLeaves),
            Shifts: backupShifts.join(',')
        };

        backups.push(newBackup);
        const updatedBackupsSheet = xlsx.utils.json_to_sheet(backups);
        workbook.Sheets['Backups'] = updatedBackupsSheet;

        xlsx.writeFile(workbook, workbookPath);

        res.status(201).json({ message: 'Person and backup added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding person and backup' });
    }
};

exports.removePerson = (req, res) => {
    const workbook = xlsx.readFile(workbookPath);
    const peopleSheet = workbook.Sheets['People'];
    const backupsSheet = workbook.Sheets['Backups'];

    const { id } = req.params;
    try {
        const people = sheetToJSON(peopleSheet).filter(person => person.ID !== parseInt(id));
        const updatedPeopleSheet = xlsx.utils.json_to_sheet(people);
        workbook.Sheets['People'] = updatedPeopleSheet;

        // Filter out the corresponding backup from the backups sheet
        const backups = sheetToJSON(backupsSheet).filter(backup => backup.Person_ID !== parseInt(id));
        const updatedBackupsSheet = xlsx.utils.json_to_sheet(backups);
        workbook.Sheets['Backups'] = updatedBackupsSheet;

        xlsx.writeFile(workbook, workbookPath);

        res.status(200).json({ message: 'Person and backup removed successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error removing person and backup' });
    }
};

