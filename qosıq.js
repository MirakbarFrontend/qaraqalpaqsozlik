// script.js

const songs = [
	{ title: 'Abarıya', artist: '', category: 'modern', file: 'audio/Abarıya.m4a' },
	{ title: 'Abaylaw', artist: '', category: 'modern', file: 'audio/Abaylaw.m4a' },
	{ title: 'Abbazı', artist: '', category: 'modern', file: 'audio/Abbazı.m4a' },
	{ title: 'Abıray', artist: '', category: 'modern', file: 'audio/Abıray.m4a' },
	{ title: 'Abırjı', artist: '', category: 'modern', file: 'audio/Abırjı.m4a' },
	{ title: 'Abısın', artist: '', category: 'modern', file: 'audio/Abısın.m4a' },
	{ title: 'Agent', artist: '', category: 'modern', file: 'audio/Agent.m4a' },
	{ title: 'Agronom', artist: '', category: 'modern', file: 'audio/Agronom.m4a' },
	{ title: 'Avans', artist: '', category: 'modern', file: 'audio/Avans.m4a' },
	{ title: 'Avgust', artist: '', category: 'modern', file: 'audio/Avgust.m4a' },
	{ title: 'Avtobus', artist: '', category: 'modern', file: 'audio/Avtobus.m4a' },
	{ title: 'Aǵa-ini', artist: '', category: 'modern', file: 'audio/Aǵa-ini.m4a' },
	{ title: 'Aǵalıq', artist: '', category: 'modern', file: 'audio/Aǵalıq.m4a' },
	{ title: 'Aǵarbulaq', artist: '', category: 'modern', file: 'audio/Aǵarbulaq.m4a' },
	{ title: 'Aǵarǵan', artist: '', category: 'modern', file: 'audio/Aǵarǵan.m4a' },
	{ title: 'Aǵawız', artist: '', category: 'modern', file: 'audio/Aǵawız.m4a' },
	{ title: 'Aǵay', artist: '', category: 'modern', file: 'audio/Aǵay.m4a' },
	{ title: 'Aǵayın', artist: '', category: 'modern', file: 'audio/Aǵayın.m4a' },
	{ title: 'Aǵla', artist: '', category: 'modern', file: 'audio/Aǵla.m4a' },
	{ title: 'Aǵza', artist: '', category: 'modern', file: 'audio/Aǵza.m4a' },
	{ title: 'Aǵzam', artist: '', category: 'modern', file: 'audio/Aǵzam.m4a' },
	{ title: 'Babay', artist: '', category: 'folk', file: 'audio/Babay.m4a' },
	{ title: 'Badam', artist: '', category: 'folk', file: 'audio/Badam.m4a' },
	{ title: 'Badıya', artist: '', category: 'folk', file: 'audio/Badıya.m4a' },
	{ title: 'Baja', artist: '', category: 'folk', file: 'audio/Baja.m4a' },
	{ title: 'Bajban', artist: '', category: 'folk', file: 'audio/Bajban.m4a' },
	{ title: 'Bajı', artist: '', category: 'folk', file: 'audio/Bajı.m4a' },
	{ title: 'Bay', artist: '', category: 'folk', file: 'audio/Bay.m4a' },
	{ title: 'Baysımaq', artist: '', category: 'folk', file: 'audio/Baysımaq.m4a' },
	{ title: 'Baytal', artist: '', category: 'folk', file: 'audio/Baytal.m4a' },
	{ title: 'Baysıraw', artist: '', category: 'folk', file: 'audio/Baysıraw.m4a' },
	{ title: 'Bayǵus', artist: '', category: 'folk', file: 'audio/Bayǵus.m4a' },
	{ title: 'Bazar', artist: '', category: 'folk', file: 'audio/Bazar.m4a' },
	{ title: 'Bazda', artist: '', category: 'folk', file: 'audio/Bazda.m4a' },
	{ title: 'Baǵ-dáwlet', artist: '', category: 'folk', file: 'audio/Baǵ-dáwlet.m4a' },
	{ title: 'Baǵ', artist: '', category: 'folk', file: 'audio/Baǵ.m4a' },
	{ title: 'Baǵana', artist: '', category: 'folk', file: 'audio/Baǵana.m4a' },
	{ title: 'Baǵdar', artist: '', category: 'folk', file: 'audio/Baǵdar.m4a' },
	{ title: 'Baǵdarlama', artist: '', category: 'folk', file: 'audio/Baǵdarlama.m4a' },
	{ title: 'Baǵman', artist: '', category: 'folk', file: 'audio/Baǵman.m4a' },
	{ title: 'Baǵındırıw', artist: '', category: 'folk', file: 'audio/Baǵındırıw.m4a' },
	{ title: 'Dabıl', artist: '', category: 'jaz', file: 'audio/Dabıl.m4a' },
	{ title: 'Dadlaw', artist: '', category: 'jaz', file: 'audio/Dadlaw.m4a' },
	{ title: 'Dal', artist: '', category: 'jaz', file: 'audio/Dal.m4a' },
	{ title: 'Dala', artist: '', category: 'jaz', file: 'audio/Dala.m4a' },
	{ title: 'Dambal', artist: '', category: 'jaz', file: 'audio/Dambal.m4a' },
	{ title: 'Dana', artist: '', category: 'jaz', file: 'audio/Dana.m4a' },
	{ title: 'Daq', artist: '', category: 'jaz', file: 'audio/Daq.m4a' },
	{ title: 'Daqıl', artist: '', category: 'jaz', file: 'audio/Daqıl.m4a' },
	{ title: 'Daǵal', artist: '', category: 'jaz', file: 'audio/Daǵal.m4a' },
	{ title: 'Daǵaza', artist: '', category: 'jaz', file: 'audio/Daǵaza.m4a' },
	{ title: 'Daǵı', artist: '', category: 'jaz', file: 'audio/Daǵı.m4a' },
	{ title: 'Daǵıstan', artist: '', category: 'jaz', file: 'audio/Daǵıstan.m4a' },
	{ title: 'Ebelek', artist: '', category: 'music', file: 'audio/Ebelek.m4a' },
	{ title: 'Ebetey', artist: '', category: 'music', file: 'audio/Ebetey.m4a' },
	{ title: 'Ebindey', artist: '', category: 'music', file: 'audio/Ebindey.m4a' },
	{ title: 'Eginshi', artist: '', category: 'music', file: 'audio/Eginshi.m4a' },
	{ title: 'Egis', artist: '', category: 'music', file: 'audio/Egis.m4a' },
	{ title: 'Ekiqabat', artist: '', category: 'music', file: 'audio/Ekiqabat.m4a' },
	{ title: 'Ekshembi', artist: '', category: 'music', file: 'audio/Ekshembi.m4a' },
	{ title: 'Elat', artist: '', category: 'music', file: 'audio/Elat.m4a' },
	{ title: 'Ezben', artist: '', category: 'music', file: 'audio/Ezben.m4a' },
	{ title: 'Eziw', artist: '', category: 'music', file: 'audio/Eziw.m4a' },
	{ title: 'Galstuk', artist: '', category: 'classic', file: 'audio/Galstuk.m4a' },
	{ title: 'Gametalar', artist: '', category: 'classic', file: 'audio/Gametalar.m4a' },
	{ title: 'Gamma', artist: '', category: 'classic', file: 'audio/Gamma.m4a' },
	{ title: 'Gandbol', artist: '', category: 'classic', file: 'audio/Gandbol.m4a' },
	{ title: 'Gangster', artist: '', category: 'classic', file: 'audio/Gangster.m4a' },
	{ title: 'Gansh', artist: '', category: 'classic', file: 'audio/Gansh.m4a' },
	{ title: 'Garaj', artist: '', category: 'classic', file: 'audio/Garaj.m4a' },
	{ title: 'Garantiya', artist: '', category: 'classic', file: 'audio/Garantiya.m4a' },
	{ title: 'Garderov', artist: '', category: 'classic', file: 'audio/Garderov.m4a' },
	{ title: 'Gayka', artist: '', category: 'classic', file: 'audio/Gayka.m4a' },
	{ title: 'Gazeta', artist: '', category: 'classic', file: 'audio/Gazeta.m4a' },
	{ title: 'Gazetashı', artist: '', category: 'classic', file: 'audio/Gazetashı.m4a' },
	{ title: 'Ǵajaw', artist: '', category: 'jozeff', file: 'audio/Ǵajaw.m4a' },
	{ title: 'Ǵajıw', artist: '', category: 'jozeff', file: 'audio/Ǵajıw.m4a' },
	{ title: 'Ǵarǵa', artist: '', category: 'jozeff', file: 'audio/Ǵarǵa.m4a' },
	{ title: 'Ǵaylı', artist: '', category: 'jozeff', file: 'audio/Ǵaylı.m4a' },
	{ title: 'Ǵayrat', artist: '', category: 'jozeff', file: 'audio/Ǵayrat.m4a' },
	{ title: 'Ǵayrı', artist: '', category: 'jozeff', file: 'audio/Ǵayrı.m4a' },
	{ title: 'Ǵayzaw', artist: '', category: 'jozeff', file: 'audio/Ǵayzaw.m4a' },
	{ title: 'Ǵayıp', artist: '', category: 'jozeff', file: 'audio/Ǵayıp.m4a' },
	{ title: 'Ǵazep', artist: '', category: 'jozeff', file: 'audio/Ǵazep.m4a' },
	{ title: 'Ǵazna', artist: '', category: 'jozeff', file: 'audio/Ǵazna.m4a' },
	{ title: 'Jaba', artist: '', category: 'fill', file: 'audio/Jaba.m4a' },
	{ title: 'Jaban', artist: '', category: 'fill', file: 'audio/Jaban.m4a' },
	{ title: 'Jabayı', artist: '', category: 'fill', file: 'audio/Jabayı.m4a' },
	{ title: 'Jabaǵı', artist: '', category: 'fill', file: 'audio/Jabaǵı.m4a' },
	{ title: 'Jabbar', artist: '', category: 'fill', file: 'audio/Jabbar.m4a' },
	{ title: 'Jalaqor', artist: '', category: 'fill', file: 'audio/Jalaqor.m4a' },
	{ title: 'Jalatay', artist: '', category: 'fill', file: 'audio/Jalatay.m4a' },
	{ title: 'Jalatpa', artist: '', category: 'fill', file: 'audio/Jalatpa.m4a' },
	{ title: 'Jalǵan', artist: '', category: 'fill', file: 'audio/Jalǵan.m4a' },
	{ title: 'Jaylaw', artist: '', category: 'fill', file: 'audio/Jaylaw.m4a' },
	{ title: 'Jaza', artist: '', category: 'fill', file: 'audio/Jaza.m4a' },
	{ title: 'Jazlıq', artist: '', category: 'fill', file: 'audio/Jazlıq.m4a' },
	{ title: 'Jazıq', artist: '', category: 'fill', file: 'audio/Jazıq.m4a' },
	{ title: 'Jazıw', artist: '', category: 'fill', file: 'audio/Jazıw.m4a' },
	{ title: 'Jaǵal', artist: '', category: 'fill', file: 'audio/Jaǵal.m4a' },
	{ title: 'Zapas', artist: '', category: 'note', file: 'audio/Zapas.m4a' },
	{ title: 'Zar', artist: '', category: 'note', file: 'audio/Zar.m4a' },
	{ title: 'Zawıq', artist: '', category: 'note', file: 'audio/Zawıq.m4a' },
	{ title: 'Zań', artist: '', category: 'note', file: 'audio/Zań.m4a' },
	{ title: 'Zańǵar', artist: '', category: 'note', file: 'audio/Zańǵar.m4a' },
	{ title: 'Zildey', artist: '', category: 'note', file: 'audio/Zildey.m4a' },
	{ title: 'Zindan', artist: '', category: 'note', file: 'audio/Zindan.m4a' },
	{ title: 'Ziyapat', artist: '', category: 'note', file: 'audio/Ziyapat.m4a' },
	{ title: 'Zona', artist: '', category: 'note', file: 'audio/Zona.m4a' },
	{ title: 'Záhmet', artist: '', category: 'note', file: 'audio/Záhmet.m4a' },
	{ title: 'Záhár', artist: '', category: 'note', file: 'audio/Záhár.m4a' },
	{ title: 'Zámber', artist: '', category: 'note', file: 'audio/Zámber.m4a' },
	{ title: 'Zámberek', artist: '', category: 'note', file: 'audio/Zámberek.m4a' },
	{ title: 'Zárde', artist: '', category: 'note', file: 'audio/Zárde.m4a' },
	{ title: 'Záńgi', artist: '', category: 'note', file: 'audio/Záńgi.m4a' },
	{ title: 'Idealizm', artist: '', category: 'click', file: 'audio/Idealizm.m4a' },
	{ title: 'Iyek', artist: '', category: 'click', file: 'audio/Iyek.m4a' },
	{ title: 'Iyis', artist: '', category: 'click', file: 'audio/Iyis.m4a' },
	{ title: 'Iyiskew', artist: '', category: 'click', file: 'audio/Iyiskew.m4a' },
	{ title: 'Iylew', artist: '', category: 'click', file: 'audio/Iylew.m4a' },
	{ title: 'Iymanlı', artist: '', category: 'click', file: 'audio/Iymanlı.m4a' },
	{ title: 'Iyne', artist: '', category: 'click', file: 'audio/Iyne.m4a' },
	{ title: 'Iyrim', artist: '', category: 'click', file: 'audio/Iyrim.m4a' },
	{ title: 'Iyshan', artist: '', category: 'click', file: 'audio/Iyshan.m4a' },
	{ title: 'Iytbalıq', artist: '', category: 'click', file: 'audio/Iytbalıq.m4a' },
	{ title: 'Iyun', artist: '', category: 'click', file: 'audio/Iyun.m4a' },
	{ title: 'Izleniw', artist: '', category: 'click', file: 'audio/Izleniw.m4a' },
	{ title: 'Yod', artist: '', category: 'pen', file: 'audio/Yod.m4a' },
	{ title: 'Yoga', artist: '', category: 'pen', file: 'audio/Yoga.m4a' },
	{ title: 'Yosh', artist: '', category: 'pen', file: 'audio/Yosh.m4a' },
	{ title: 'Yoshlı', artist: '', category: 'pen', file: 'audio/Yoshlı.m4a' },
	{ title: 'Kadastr', artist: '', category: 'krish', file: 'audio/Kadastr.m4a' },
	{ title: 'Kadr', artist: '', category: 'krish', file: 'audio/Kadr.m4a' },
	{ title: 'Kaktus', artist: '', category: 'krish', file: 'audio/Kaktus.m4a' },
	{ title: 'Kalendar', artist: '', category: 'krish', file: 'audio/Kalendar.m4a' },
	{ title: 'Kamzol', artist: '', category: 'krish', file: 'audio/Kamzol.m4a' },
	{ title: 'Kapitan', artist: '', category: 'krish', file: 'audio/Kapitan.m4a' },
	{ title: 'Kapusta', artist: '', category: 'krish', file: 'audio/Kapusta.m4a' },
	{ title: 'Kassir', artist: '', category: 'krish', file: 'audio/Kassir.m4a' },
	{ title: 'Kazarma', artist: '', category: 'krish', file: 'audio/Kazarma.m4a' },
	{ title: 'Kegey', artist: '', category: 'krish', file: 'audio/Kegey.m4a' },
	{ title: 'Keme', artist: '', category: 'krish', file: 'audio/Keme.m4a' },
	{ title: 'Kvartal', artist: '', category: 'krish', file: 'audio/Kvartal.m4a' },
	{ title: 'Kápir', artist: '', category: 'krish', file: 'audio/Kápir.m4a' },
	{ title: 'Kárxana', artist: '', category: 'krish', file: 'audio/Kárxana.m4a' },
	{ title: 'Qabaǵan', artist: '', category: 'quen', file: 'audio/Qabaǵan.m4a' },
	{ title: 'Qabırshaq', artist: '', category: 'quen', file: 'audio/Qabırshaq.m4a' },
	{ title: 'Qabırǵa', artist: '', category: 'quen', file: 'audio/Qabırǵa.m4a' },
	{ title: 'Qaltıs', artist: '', category: 'quen', file: 'audio/Qaltıs.m4a' },
	{ title: 'Qaraqshı', artist: '', category: 'quen', file: 'audio/Qaraqshı.m4a' },
	{ title: 'Qaraǵay', artist: '', category: 'quen', file: 'audio/Qaraǵay.m4a' },
	{ title: 'Qaraǵım', artist: '', category: 'quen', file: 'audio/Qaraǵım.m4a' },
	{ title: 'Qarındas', artist: '', category: 'quen', file: 'audio/Qarındas.m4a' },
	{ title: 'Qazan', artist: '', category: 'quen', file: 'audio/Qazan.m4a' },
	{ title: 'Qaǵaz', artist: '', category: 'quen', file: 'audio/Qaǵaz.m4a' },
	{ title: 'Lala', artist: '', category: 'lirika', file: 'audio/Lala.m4a' },
	{ title: 'Lampa', artist: '', category: 'lirika', file: 'audio/Lampa.m4a' },
	{ title: 'Lampamay', artist: '', category: 'lirika', file: 'audio/Lampamay.m4a' },
	{ title: 'Lamposhka', artist: '', category: 'lirika', file: 'audio/Lamposhka.m4a' },
	{ title: 'Lapgóy', artist: '', category: 'lirika', file: 'audio/Lapgóy.m4a' },
	{ title: 'Laqap', artist: '', category: 'lirika', file: 'audio/Laqap.m4a' },
	{ title: 'Laqat', artist: '', category: 'lirika', file: 'audio/Laqat.m4a' },
	{ title: 'Lashın', artist: '', category: 'lirika', file: 'audio/Lashın.m4a' },
	{ title: 'Legion', artist: '', category: 'lirika', file: 'audio/Legion.m4a' },
	{ title: 'Lenta', artist: '', category: 'lirika', file: 'audio/Lenta.m4a' },
	{ title: 'Lider', artist: '', category: 'lirika', file: 'audio/Lider.m4a' },
	{ title: 'Lipas', artist: '', category: 'lirika', file: 'audio/Lipas.m4a' },
	{ title: 'Lárzem', artist: '', category: 'lirika', file: 'audio/Lárzem.m4a' },
	{ title: 'Láshker', artist: '', category: 'lirika', file: 'audio/Láshker.m4a' },
];

function filterSongs(category) {
	loadSongs(category);
}

document.getElementById('searchInput').addEventListener('input', () => loadSongs());

window.onload = () => {
	loadSongs();
};
EOF;

function loadSongs(filter = 'all') {
	const list = document.getElementById('songList');
	list.innerHTML = '';

	const searchQuery = document.getElementById('searchInput').value.toLowerCase();

	songs
		.filter(song => {
			const matchCategory = filter === 'all' || song.category === filter;
			const matchSearch =
				song.title.toLowerCase().includes(searchQuery) ||
				song.artist.toLowerCase().includes(searchQuery) ||
				song.category.toLowerCase().includes(searchQuery);
			return matchCategory && matchSearch;
		})
		.forEach(song => {
			const el = document.createElement('div');
			el.className = 'song';
			el.innerHTML = `<strong>${song.title}</strong><br><em>${song.artist}</em>
      <audio controls>
        <source src="${song.file}" type="audio/mp3">
        Sizning brauzeringiz audio pleerni qo‘llab-quvvatlamaydi.
      </audio>`;
			list.appendChild(el);
		});
}

function filterSongs(category) {
	loadSongs(category);
}

document.getElementById('searchInput').addEventListener('input', () => loadSongs());

window.onload = () => {
	loadSongs();
};
