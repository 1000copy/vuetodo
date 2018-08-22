import test from 'ava';
import M from '../VisitMongo.js'
test('foo', t => {
    t.pass();
});
test('foo', async t => {
	var m = new M()
    var todos = await m.allDoc()
    for (var i = 0; i < todos.length; i++) {
    	await m.deleteDoc(todos[i].id)
    }
    var todos = await m.allDoc()
    t.is(todos.length ,0)
    await m.insertDoc('1')
    await m.insertDoc('2')
    await m.insertDoc('3')
    var todos = await m.allDoc()
    t.is(todos.length ,3)
});

