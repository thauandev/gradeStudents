import { db } from "../models/index.js";
import studentModel from "../models/student.js";

const create = async (req, res) => {
  try {
    const student = new studentModel(req.body);
    // os dados são salvos no banco de dados
    await student.save();
    res.json(student);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name ? (condition = name) : "";

  try {
    if (condition === "") {
      const student = await studentModel.find({});

      return res.json(student);
    }
    const student = await studentModel.find({ name: condition });

    return res.json(student);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const student = await studentModel.findById(id);
    res.json(student);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar o Grade id: " + id });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados para atualizacao vazio",
    });
  }

  const { id } = req.params;

  try {
    await studentModel.findByIdAndUpdate(id, req.body);
    res.json({ message: "Grade atualizado com sucesso" });
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar a Grade id: " + id });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    await studentModel.findByIdAndDelete(id);
    res.json({ message: "Grade excluido com sucesso" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar o Grade id: " + id });
  }
};

const removeAll = async (req, res) => {
  const id = req.params.id;

  try {
    res.send({
      message: `Grades excluidos`,
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao excluir todos as Grades" });
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
