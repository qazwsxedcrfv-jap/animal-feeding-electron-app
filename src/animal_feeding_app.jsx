import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Download, Trash2, Search, Save, Edit, Settings } from 'lucide-react';

const AnimalFeedingApp = () => {
  const [animals, setAnimals] = useState([]);
  const [feedingRecords, setFeedingRecords] = useState([]);
  const [currentRecord, setCurrentRecord] = useState({
    date: new Date().toISOString().split('T')[0],
    animalId: '',
    milkReplacer: '', // 代用乳 (g)
    milkReplacerName: '', // 代用乳名
    artificialMilk: '', // 人工乳 (g)
    artificialMilkName: '', // 人工乳名
    roughage: '', // 粗飼料 (g)
    roughageName: '', // 粗飼料名
    weight: '',
    fecalScore: '3',
    healthNotes: ''
  });
  const [showAddAnimal, setShowAddAnimal] = useState(false);
  const [newAnimal, setNewAnimal] = useState({
    id: '',
    name: '',
    species: '',
    breed: '',
    gender: '',
    motherNo: '',
    birthDate: '',
    feedingProgram: '',
    penNo: ''
  });
  const [activeTab, setActiveTab] = useState('input');
  const [feedingMenus, setFeedingMenus] = useState([]);
  const [feedingPrograms, setFeedingPrograms] = useState([]);
  const [newMenu, setNewMenu] = useState({
    programName: '',
    name: '',
    ageRangeStart: '',
    ageRangeEnd: '',
    milkReplacer: '',
    milkReplacerName: '',
    artificialMilk: '',
    artificialMilkName: '',
    roughage: '',
    roughageName: '',
    notes: ''
  });
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showAddProgram, setShowAddProgram] = useState(false);
  const [newProgramName, setNewProgramName] = useState('');
  const [editingAnimal, setEditingAnimal] = useState(null);

  useEffect(() => {
    // サンプルデータの初期化
    const samplePrograms = [
      '標準プログラム',
      '早期離乳プログラム',
      '高栄養プログラム',
      'オーガニックプログラム'
    ];
    setFeedingPrograms(samplePrograms);

    const sampleAnimals = [
      { id: 'A001', name: 'ホルスタイン1号', species: 'ホルスタイン', breed: '純血', gender: '雌', motherNo: 'M001', birthDate: '2022-03-15', feedingProgram: '標準プログラム', penNo: '1-A' },
      { id: 'A002', name: 'ホルスタイン2号', species: 'ホルスタイン', breed: '純血', gender: '雄', motherNo: 'M002', birthDate: '2022-04-20', feedingProgram: '早期離乳プログラム', penNo: '2-B' },
      { id: 'A003', name: 'ジャージー1号', species: 'ジャージー', breed: '純血', gender: '雌', motherNo: 'J001', birthDate: '2022-05-10', feedingProgram: '標準プログラム', penNo: '1-C' }
    ];
    setAnimals(sampleAnimals);

    const sampleMenus = [
      // 標準プログラム
      { id: 1, programName: '標準プログラム', name: '離乳前期', ageRangeStart: 0, ageRangeEnd: 30, milkReplacer: 4000, milkReplacerName: 'A社ミルク', artificialMilk: 0, artificialMilkName: '', roughage: 100, roughageName: '一番草', notes: '代用乳中心の栄養摂取' },
      { id: 2, programName: '標準プログラム', name: '離乳中期', ageRangeStart: 31, ageRangeEnd: 60, milkReplacer: 2000, milkReplacerName: 'A社ミルク', artificialMilk: 1000, artificialMilkName: 'B社スターター', roughage: 300, roughageName: '二番草', notes: '人工乳への移行期' },
      { id: 3, programName: '標準プログラム', name: '離乳後期', ageRangeStart: 61, ageRangeEnd: 90, milkReplacer: 0, milkReplacerName: '', artificialMilk: 2000, artificialMilkName: 'C社育成飼料', roughage: 500, roughageName: '三番草', notes: '固形飼料中心' },
      { id: 4, programName: '標準プログラム', name: '育成期', ageRangeStart: 91, ageRangeEnd: 365, milkReplacer: 0, milkReplacerName: '', artificialMilk: 3000, artificialMilkName: 'C社育成飼料', roughage: 1000, roughageName: '牧草ロール', notes: '成長期配合飼料' },
      { id: 5, programName: '標準プログラム', name: '成牛期', ageRangeStart: 366, ageRangeEnd: 9999, milkReplacer: 0, milkReplacerName: '', artificialMilk: 4000, artificialMilkName: 'D社成牛飼料', roughage: 2000, roughageName: 'TMR', notes: '維持・生産用飼料' },

      // 早期離乳プログラム
      { id: 6, programName: '早期離乳プログラム', name: '離乳前期', ageRangeStart: 0, ageRangeEnd: 21, milkReplacer: 3500, milkReplacerName: 'A社ミルク', artificialMilk: 0, artificialMilkName: '', roughage: 200, roughageName: '一番草', notes: '早期固形飼料導入' },
      { id: 7, programName: '早期離乳プログラム', name: '離乳中期', ageRangeStart: 22, ageRangeEnd: 42, milkReplacer: 1000, milkReplacerName: 'A社ミルク', artificialMilk: 1500, artificialMilkName: 'B社スターター', roughage: 400, roughageName: '二番草', notes: '急速な移行' },
      { id: 8, programName: '早期離乳プログラム', name: '離乳後期', ageRangeStart: 43, ageRangeEnd: 70, milkReplacer: 0, milkReplacerName: '', artificialMilk: 2500, artificialMilkName: 'C社育成飼料', roughage: 600, roughageName: '三番草', notes: '完全固形飼料' },

      // 高栄養プログラム
      { id: 9, programName: '高栄養プログラム', name: '離乳前期', ageRangeStart: 0, ageRangeEnd: 35, milkReplacer: 5000, milkReplacerName: 'E社高栄養ミルク', artificialMilk: 0, artificialMilkName: '', roughage: 150, roughageName: '一番草', notes: '高栄養代用乳使用' },
      { id: 10, programName: '高栄養プログラム', name: '離乳中期', ageRangeStart: 36, ageRangeEnd: 70, milkReplacer: 3000, milkReplacerName: 'E社高栄養ミルク', artificialMilk: 1500, artificialMilkName: 'C社育成飼料', roughage: 400, roughageName: '二番草', notes: '濃厚飼料増量' },
    ];
    setFeedingMenus(sampleMenus);
  }, []);

  const addAnimal = () => {
    if (newAnimal.id && newAnimal.name) {
      setAnimals([...animals, { ...newAnimal }]);
      setNewAnimal({ id: '', name: '', species: '', breed: '', gender: '', motherNo: '', birthDate: '', feedingProgram: '', penNo: '' });
      setShowAddAnimal(false);
    }
  };

  const updateAnimal = (updatedAnimal) => {
    setAnimals(animals.map(animal =>
      animal.id === updatedAnimal.id ? updatedAnimal : animal
    ));
    setEditingAnimal(null);
  };

  const addFeedingProgram = () => {
    if (newProgramName && !feedingPrograms.includes(newProgramName)) {
      setFeedingPrograms([...feedingPrograms, newProgramName]);
      setNewProgramName('');
      setShowAddProgram(false);
    }
  };

  const addFeedingMenu = () => {
    if (newMenu.programName && newMenu.name && newMenu.ageRangeStart && newMenu.ageRangeEnd) {
      const menu = {
        ...newMenu,
        id: Date.now(),
        ageRangeStart: parseInt(newMenu.ageRangeStart),
        ageRangeEnd: parseInt(newMenu.ageRangeEnd),
        milkReplacer: parseFloat(newMenu.milkReplacer || 0),
        artificialMilk: parseFloat(newMenu.artificialMilk || 0),
        roughage: parseFloat(newMenu.roughage || 0)
      };
      setFeedingMenus([...feedingMenus, menu]);
      setNewMenu({
        programName: '',
        name: '',
        ageRangeStart: '',
        ageRangeEnd: '',
        milkReplacer: '',
        milkReplacerName: '',
        artificialMilk: '',
        artificialMilkName: '',
        roughage: '',
        roughageName: '',
        notes: ''
      });
      setShowAddMenu(false);
    }
  };

  const calculateAge = (birthDate, targetDate) => {
    const birth = new Date(birthDate);
    const target = new Date(targetDate);
    const diffTime = Math.abs(target - birth);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getRecommendedFeeding = (animalId, date) => {
    const animal = animals.find(a => a.id === animalId);
    if (!animal || !animal.birthDate || !animal.feedingProgram) return null;

    const age = calculateAge(animal.birthDate, date);
    const menu = feedingMenus.find(m =>
      m.programName === animal.feedingProgram &&
      age >= m.ageRangeStart &&
      age <= m.ageRangeEnd
    );

    return menu ? { ...menu, age } : null;
  };

  const applyRecommendedFeeding = () => {
    const recommended = getRecommendedFeeding(currentRecord.animalId, currentRecord.date);
    if (recommended) {
      setCurrentRecord({
        ...currentRecord,
        milkReplacer: recommended.milkReplacer.toString(),
        milkReplacerName: recommended.milkReplacerName,
        artificialMilk: recommended.artificialMilk.toString(),
        artificialMilkName: recommended.artificialMilkName,
        roughage: recommended.roughage.toString(),
        roughageName: recommended.roughageName
      });
    }
  };

  const saveRecord = () => {
    if (currentRecord.animalId && currentRecord.date) {
      const record = {
        ...currentRecord,
        id: Date.now(),
        timestamp: new Date().toISOString()
      };
      setFeedingRecords([...feedingRecords, record]);

      // フォームをリセット（個体IDと日付は保持）
      setCurrentRecord({
        ...currentRecord,
        milkReplacer: '',
        milkReplacerName: '',
        artificialMilk: '',
        artificialMilkName: '',
        roughage: '',
        roughageName: '',
        weight: '',
        fecalScore: '3',
        healthNotes: ''
      });

      alert('データを保存しました');
    } else {
      alert('個体IDと日付を入力してください');
    }
  };

  const exportToExcel = () => {
    if (feedingRecords.length === 0) {
      alert('エクスポートするデータがありません');
      return;
    }

    const headers = ['日付', '個体ID', '個体名', 'ペンNo', '代用乳名', '代用乳(g)', '人工乳名', '人工乳(g)', '粗飼料名', '粗飼料(g)', '体重(kg)', '糞便スコア', '備考'];
    const csvData = feedingRecords.map(record => {
      const animal = animals.find(a => a.id === record.animalId);
      return [
        record.date,
        record.animalId,
        animal?.name || '',
        animal?.penNo || '',
        record.milkReplacerName || '',
        record.milkReplacer || '',
        record.artificialMilkName || '',
        record.artificialMilk || '',
        record.roughageName || '',
        record.roughage || '',
        record.weight || '',
        record.fecalScore,
        record.healthNotes || ''
      ];
    });

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `feeding_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearOldData = () => {
    if (window.confirm('古いデータを削除しますか？この操作は取り消せません。')) {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const recentRecords = feedingRecords.filter(record =>
        new Date(record.date) > oneMonthAgo
      );

      setFeedingRecords(recentRecords);
      alert(`削除しました。現在のデータ数: ${recentRecords.length}件`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="bg-blue-600 text-white p-4 rounded-t-lg">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            飼育データ管理
          </h1>
          <p className="text-blue-100 mt-1">データ件数: {feedingRecords.length}件 | 登録個体: {animals.length}頭</p>
        </div>

        {/* タブナビゲーション */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('input')}
            className={`px-6 py-3 font-medium ${activeTab === 'input'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-800'}`}
          >
            データ入力
          </button>
          <button
            onClick={() => setActiveTab('records')}
            className={`px-6 py-3 font-medium ${activeTab === 'records'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-800'}`}
          >
            記録一覧
          </button>
          <button
            onClick={() => setActiveTab('menus')}
            className={`px-6 py-3 font-medium ${activeTab === 'menus'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-800'}`}
          >
            給与メニュー
          </button>
          <button
            onClick={() => setActiveTab('animals')}
            className={`px-6 py-3 font-medium ${activeTab === 'animals'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-800'}`}
          >
            個体管理
          </button>
        </div>

        <div className="p-6">
          {/* データ入力タブ */}
          {activeTab === 'input' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">日付</label>
                  <input
                    type="date"
                    value={currentRecord.date}
                    onChange={(e) => setCurrentRecord({...currentRecord, date: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">個体選択</label>
                  <select
                    value={currentRecord.animalId}
                    onChange={(e) => setCurrentRecord({...currentRecord, animalId: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="">個体を選択してください</option>
                    {animals.map(animal => (
                      <option key={animal.id} value={animal.id}>
                        {animal.id} - {animal.name} ({animal.feedingProgram || '未設定'})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">代用乳名</label>
                  <input
                    type="text"
                    value={currentRecord.milkReplacerName}
                    onChange={(e) => setCurrentRecord({...currentRecord, milkReplacerName: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="例：A社ミルク"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">代用乳給与量 (g)</label>
                  <input
                    type="number"
                    step="1"
                    value={currentRecord.milkReplacer}
                    onChange={(e) => setCurrentRecord({...currentRecord, milkReplacer: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">人工乳名</label>
                  <input
                    type="text"
                    value={currentRecord.artificialMilkName}
                    onChange={(e) => setCurrentRecord({...currentRecord, artificialMilkName: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="例：B社スターター"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">人工乳給与量 (g)</label>
                  <input
                    type="number"
                    step="1"
                    value={currentRecord.artificialMilk}
                    onChange={(e) => setCurrentRecord({...currentRecord, artificialMilk: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">粗飼料名</label>
                  <input
                    type="text"
                    value={currentRecord.roughageName}
                    onChange={(e) => setCurrentRecord({...currentRecord, roughageName: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="例：一番草"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">粗飼料給与量 (g)</label>
                  <input
                    type="number"
                    step="1"
                    value={currentRecord.roughage}
                    onChange={(e) => setCurrentRecord({...currentRecord, roughage: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">体重 (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={currentRecord.weight}
                  onChange={(e) => setCurrentRecord({...currentRecord, weight: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="0.0"
                />
              </div>

              {/* 推奨給与量表示 */}
              {currentRecord.animalId && currentRecord.date && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      {(() => {
                        const recommended = getRecommendedFeeding(currentRecord.animalId, currentRecord.date);
                        const animal = animals.find(a => a.id === currentRecord.animalId);
                        return recommended ? (
                          <div>
                            <h3 className="font-semibold text-blue-800">推奨給与量</h3>
                            <p className="text-sm text-blue-600">
                              日齢: {recommended.age}日 | プログラム: {recommended.programName}
                            </p>
                            <p className="text-sm text-blue-600">
                              メニュー: {recommended.name}
                            </p>
                            <p className="text-sm text-blue-600">
                              代用乳: {recommended.milkReplacerName} ({recommended.milkReplacer}g), 人工乳: {recommended.artificialMilkName} ({recommended.artificialMilk}g), 粗飼料: {recommended.roughageName} ({recommended.roughage}g)
                            </p>
                            {recommended.notes && (
                              <p className="text-xs text-blue-500 mt-1">{recommended.notes}</p>
                            )}
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm text-gray-600">該当する給与メニューがありません</p>
                            {animal && !animal.feedingProgram && (
                              <p className="text-xs text-red-500 mt-1">※ この個体に給与プログラムが設定されていません</p>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                    <button
                      onClick={applyRecommendedFeeding}
                      disabled={!getRecommendedFeeding(currentRecord.animalId, currentRecord.date)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      適用
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">糞便スコア</label>
                  <select
                    value={currentRecord.fecalScore}
                    onChange={(e) => setCurrentRecord({...currentRecord, fecalScore: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="1">1 - 硬い</option>
                    <option value="2">2 - 正常</option>
                    <option value="3">3 - 軟便</option>
                    <option value="4">4 - 水様便</option>
                    <option value="5">5 - 重症</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">備考</label>
                  <input
                    type="text"
                    value={currentRecord.healthNotes}
                    onChange={(e) => setCurrentRecord({...currentRecord, healthNotes: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="特記事項があれば入力"
                  />
                </div>
              </div>

              <button
                onClick={saveRecord}
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                データを保存
              </button>
            </div>
          )}

          {/* 記録一覧タブ */}
          {activeTab === 'records' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">保存済み記録</h2>
                <div className="flex gap-2">
                  <button
                    onClick={exportToExcel}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Excel出力
                  </button>
                  <button
                    onClick={clearOldData}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    古いデータ削除
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 p-2 text-left">日付</th>
                      <th className="border border-gray-300 p-2 text-left">個体ID</th>
                      <th className="border border-gray-300 p-2 text-left">ペンNo</th>
                      <th className="border border-gray-300 p-2 text-left">代用乳名</th>
                      <th className="border border-gray-300 p-2 text-left">代用乳(g)</th>
                      <th className="border border-gray-300 p-2 text-left">人工乳名</th>
                      <th className="border border-gray-300 p-2 text-left">人工乳(g)</th>
                      <th className="border border-gray-300 p-2 text-left">粗飼料名</th>
                      <th className="border border-gray-300 p-2 text-left">粗飼料(g)</th>
                      <th className="border border-gray-300 p-2 text-left">体重</th>
                      <th className="border border-gray-300 p-2 text-left">糞便スコア</th>
                      <th className="border border-gray-300 p-2 text-left">メモ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedingRecords.slice(-10).reverse().map(record => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-2">{record.date}</td>
                        <td className="border border-gray-300 p-2">{record.animalId}</td>
                        <td className="border border-gray-300 p-2">{animals.find(a => a.id === record.animalId)?.penNo || '-'}</td>
                        <td className="border border-gray-300 p-2">{record.milkReplacerName || '-'}</td>
                        <td className="border border-gray-300 p-2">{record.milkReplacer || '-'}</td>
                        <td className="border border-gray-300 p-2">{record.artificialMilkName || '-'}</td>
                        <td className="border border-gray-300 p-2">{record.artificialMilk || '-'}</td>
                        <td className="border border-gray-300 p-2">{record.roughageName || '-'}</td>
                        <td className="border border-gray-300 p-2">{record.roughage || '-'}</td>
                        <td className="border border-gray-300 p-2">{record.weight || '-'}</td>
                        <td className="border border-gray-300 p-2">{record.fecalScore}</td>
                        <td className="border border-gray-300 p-2">{record.healthNotes || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {feedingRecords.length === 0 && (
                  <p className="text-center py-8 text-gray-500">保存されたデータがありません</p>
                )}
              </div>
            </div>
          )}

          {/* 給与メニュー管理タブ */}
          {activeTab === 'menus' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">給与メニュー管理</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddProgram(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    プログラム追加
                  </button>
                  <button
                    onClick={() => setShowAddMenu(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    メニュー追加
                  </button>
                </div>
              </div>

              {/* プログラム追加フォーム */}
              {showAddProgram && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">新しい給与プログラムを追加</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="プログラム名 (例: 特別栄養プログラム)"
                      value={newProgramName}
                      onChange={(e) => setNewProgramName(e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded"
                    />
                    <button
                      onClick={addFeedingProgram}
                      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                      追加
                    </button>
                    <button
                      onClick={() => setShowAddProgram(false)}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              )}

              {/* メニュー追加フォーム */}
              {showAddMenu && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">新しい給与メニューを追加</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={newMenu.programName}
                      onChange={(e) => setNewMenu({...newMenu, programName: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    >
                      <option value="">プログラムを選択</option>
                      {feedingPrograms.map(program => (
                        <option key={program} value={program}>{program}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="メニュー名 (例: 離乳期メニュー)"
                      value={newMenu.name}
                      onChange={(e) => setNewMenu({...newMenu, name: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="開始日齢"
                        value={newMenu.ageRangeStart}
                        onChange={(e) => setNewMenu({...newMenu, ageRangeStart: e.target.value})}
                        className="p-2 border border-gray-300 rounded flex-1"
                      />
                      <span className="self-center">〜</span>
                      <input
                        type="number"
                        placeholder="終了日齢"
                        value={newMenu.ageRangeEnd}
                        onChange={(e) => setNewMenu({...newMenu, ageRangeEnd: e.target.value})}
                        className="p-2 border border-gray-300 rounded flex-1"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="代用乳名 (例: A社ミルク)"
                      value={newMenu.milkReplacerName}
                      onChange={(e) => setNewMenu({...newMenu, milkReplacerName: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="number"
                      step="1"
                      placeholder="代用乳量 (g)"
                      value={newMenu.milkReplacer}
                      onChange={(e) => setNewMenu({...newMenu, milkReplacer: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      placeholder="人工乳名 (例: B社スターター)"
                      value={newMenu.artificialMilkName}
                      onChange={(e) => setNewMenu({...newMenu, artificialMilkName: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="number"
                      step="1"
                      placeholder="人工乳量 (g)"
                      value={newMenu.artificialMilk}
                      onChange={(e) => setNewMenu({...newMenu, artificialMilk: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      placeholder="粗飼料名 (例: 一番草)"
                      value={newMenu.roughageName}
                      onChange={(e) => setNewMenu({...newMenu, roughageName: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="number"
                      step="1"
                      placeholder="粗飼料量 (g)"
                      value={newMenu.roughage}
                      onChange={(e) => setNewMenu({...newMenu, roughage: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      placeholder="備考・メモ"
                      value={newMenu.notes}
                      onChange={(e) => setNewMenu({...newMenu, notes: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={addFeedingMenu}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      追加
                    </button>
                    <button
                      onClick={() => setShowAddMenu(false)}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              )}

              {/* プログラム別メニュー表示 */}
              {feedingPrograms.map(program => {
                const programMenus = feedingMenus.filter(menu => menu.programName === program);
                if (programMenus.length === 0) return null;

                return (
                  <div key={program} className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-700 mb-3">{program}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="border border-gray-300 p-2 text-left">メニュー名</th>
                            <th className="border border-gray-300 p-2 text-left">適用日齢</th>
                            <th className="border border-gray-300 p-2 text-left">代用乳 (g)</th>
                            <th className="border border-gray-300 p-2 text-left">人工乳 (g)</th>
                            <th className="border border-gray-300 p-2 text-left">粗飼料 (g)</th>
                            <th className="border border-gray-300 p-2 text-left">備考</th>
                          </tr>
                        </thead>
                        <tbody>
                          {programMenus
                            .sort((a, b) => a.ageRangeStart - b.ageRangeStart)
                            .map(menu => (
                            <tr key={menu.id} className="hover:bg-gray-50">
                              <td className="border border-gray-300 p-2">{menu.name}</td>
                              <td className="border border-gray-300 p-2">
                                {menu.ageRangeStart}〜{menu.ageRangeEnd === 9999 ? '∞' : menu.ageRangeEnd}日
                              </td>
                              <td className="border border-gray-300 p-2">{menu.milkReplacerName} ({menu.milkReplacer})</td>
                              <td className="border border-gray-300 p-2">{menu.artificialMilkName} ({menu.artificialMilk})</td>
                              <td className="border border-gray-300 p-2">{menu.roughageName} ({menu.roughage})</td>
                              <td className="border border-gray-300 p-2">{menu.notes || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 個体管理タブ */}
          {activeTab === 'animals' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">個体管理</h2>
                <button
                  onClick={() => setShowAddAnimal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  個体追加
                </button>
              </div>

              {/* 個体追加フォーム */}
              {showAddAnimal && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">新しい個体を追加</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="個体ID (例: A004)"
                      value={newAnimal.id}
                      onChange={(e) => setNewAnimal({...newAnimal, id: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      placeholder="個体名"
                      value={newAnimal.name}
                      onChange={(e) => setNewAnimal({...newAnimal, name: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <select
                      value={newAnimal.species}
                      onChange={(e) => setNewAnimal({...newAnimal, species: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    >
                      <option value="">品種を選択</option>
                      <option value="ホルスタイン">ホルスタイン</option>
                      <option value="ジャージー">ジャージー</option>
                      <option value="ブラウンスイス">ブラウンスイス</option>
                      <option value="エアシャー">エアシャー</option>
                      <option value="その他">その他</option>
                    </select>
                    <input
                      type="text"
                      placeholder="血統 (例: 純血、F1等)"
                      value={newAnimal.breed}
                      onChange={(e) => setNewAnimal({...newAnimal, breed: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <select
                      value={newAnimal.gender}
                      onChange={(e) => setNewAnimal({...newAnimal, gender: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    >
                      <option value="">性別を選択</option>
                      <option value="雌">雌</option>
                      <option value="雄">雄</option>
                      <option value="去勢雄">去勢雄</option>
                    </select>
                    <input
                      type="text"
                      placeholder="母牛No (例: M001)"
                      value={newAnimal.motherNo}
                      onChange={(e) => setNewAnimal({...newAnimal, motherNo: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="date"
                      placeholder="生年月日"
                      value={newAnimal.birthDate}
                      onChange={(e) => setNewAnimal({...newAnimal, birthDate: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      placeholder="ペンNo (例: 1-A)"
                      value={newAnimal.penNo}
                      onChange={(e) => setNewAnimal({...newAnimal, penNo: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <select
                      value={newAnimal.feedingProgram}
                      onChange={(e) => setNewAnimal({...newAnimal, feedingProgram: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    >
                      <option value="">給与プログラムを選択</option>
                      {feedingPrograms.map(program => (
                        <option key={program} value={program}>{program}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={addAnimal}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      追加
                    </button>
                    <button
                      onClick={() => setShowAddAnimal(false)}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              )}

              {/* 個体編集フォーム */}
              {editingAnimal && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">個体情報を編集</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="個体ID"
                      value={editingAnimal.id}
                      onChange={(e) => setEditingAnimal({...editingAnimal, id: e.target.value})}
                      className="p-2 border border-gray-300 rounded bg-gray-100"
                      disabled
                    />
                    <input
                      type="text"
                      placeholder="個体名"
                      value={editingAnimal.name}
                      onChange={(e) => setEditingAnimal({...editingAnimal, name: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <select
                      value={editingAnimal.species}
                      onChange={(e) => setEditingAnimal({...editingAnimal, species: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    >
                      <option value="">品種を選択</option>
                      <option value="ホルスタイン">ホルスタイン</option>
                      <option value="ジャージー">ジャージー</option>
                      <option value="ブラウンスイス">ブラウンスイス</option>
                      <option value="エアシャー">エアシャー</option>
                      <option value="その他">その他</option>
                    </select>
                    <input
                      type="text"
                      placeholder="血統 (例: 純血、F1等)"
                      value={editingAnimal.breed}
                      onChange={(e) => setEditingAnimal({...editingAnimal, breed: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <select
                      value={editingAnimal.gender}
                      onChange={(e) => setEditingAnimal({...editingAnimal, gender: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    >
                      <option value="">性別を選択</option>
                      <option value="雌">雌</option>
                      <option value="雄">雄</option>
                      <option value="去勢雄">去勢雄</option>
                    </select>
                    <input
                      type="text"
                      placeholder="母牛No (例: M001)"
                      value={editingAnimal.motherNo}
                      onChange={(e) => setEditingAnimal({...editingAnimal, motherNo: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="date"
                      placeholder="生年月日"
                      value={editingAnimal.birthDate}
                      onChange={(e) => setEditingAnimal({...editingAnimal, birthDate: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      placeholder="ペンNo (例: 1-A)"
                      value={editingAnimal.penNo}
                      onChange={(e) => setEditingAnimal({...editingAnimal, penNo: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <select
                      value={editingAnimal.feedingProgram}
                      onChange={(e) => setEditingAnimal({...editingAnimal, feedingProgram: e.target.value})}
                      className="p-2 border border-gray-300 rounded"
                    >
                      <option value="">給与プログラムを選択</option>
                      {feedingPrograms.map(program => (
                        <option key={program} value={program}>{program}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => updateAnimal(editingAnimal)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      更新
                    </button>
                    <button
                      onClick={() => setEditingAnimal(null)}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              )}

              {/* 個体カード表示 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {animals.map(animal => (
                  <div key={animal.id} className="bg-white border border-gray-300 rounded-lg p-4 relative">
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => setEditingAnimal({...animal})}
                        className="text-gray-500 hover:text-blue-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="font-semibold text-lg pr-8">{animal.name}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><span className="font-medium">ID:</span> {animal.id}</p>
                      <p><span className="font-medium">ペンNo:</span> {animal.penNo}</p>
                      <p><span className="font-medium">品種:</span> {animal.species}</p>
                      <p><span className="font-medium">血統:</span> {animal.breed}</p>
                      <p><span className="font-medium">性別:</span> {animal.gender}</p>
                      <p><span className="font-medium">母牛No:</span> {animal.motherNo}</p>
                      <p><span className="font-medium">生年月日:</span> {animal.birthDate}</p>
                      <p><span className="font-medium">現在日齢:</span> {animal.birthDate ? calculateAge(animal.birthDate, new Date().toISOString().split('T')[0]) : '-'}日</p>
                      <p className="pt-2">
                        <span className="font-medium">給与プログラム:</span>
                        <span className={`ml-1 px-2 py-1 rounded text-xs ${animal.feedingProgram ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                          {animal.feedingProgram || '未設定'}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalFeedingApp;
