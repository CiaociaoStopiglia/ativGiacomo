import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

// Chave individual da sua dupla configurada
const API_KEY = "cv_cDgFpQYN_oTZYKV-kLfL8EBUwcZKKQgsYC8m9T1aCyXv9mjin604q0g3AdXfINsZ";

// Instância única do axios com baseURL e header de autorização
const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

export default function JogosScreen() {
  // ---------- ESTADOS DA LISTAGEM (GET) ----------
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // ---------- ESTADOS DO FORMULÁRIO (POST) ----------
  const [titulo, setTitulo] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [categoria, setCategoria] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [desenvolvedora, setDesenvolvedora] = useState("");
  const [enviando, setEnviando] = useState(false);

  // ---------- FUNÇÃO GET: BUSCAR JOGOS ----------
  async function buscarJogos() {
    setCarregando(true);
    setErro(null);
    try {
      const resposta = await api.get("/api/jogos", {
        params: { limit: 50 },
      });
      setJogos(resposta.data.data);
    } catch (e) {
      setErro("Não foi possível carregar os jogos. Tenta de novo em instantes.");
    } finally {
      setCarregando(false);
    }
  }

  // ---------- FUNÇÃO POST: CRIAR JOGO ----------
  async function criarJogo() {
    if (!titulo) {
      Alert.alert("Preencha pelo menos o título.");
      return;
    }

    setEnviando(true);
    try {
      const resposta = await api.post("/api/jogos", {
        title: titulo,
        imageUrl: imagemUrl,
        categoria,
        plataforma,
        desenvolvedora,
      });

      Alert.alert("Jogo criado!", resposta.data.title || titulo);

      // Limpa o formulário
      setTitulo("");
      setImagemUrl("");
      setCategoria("");
      setPlataforma("");
      setDesenvolvedora("");

      // Atualiza a listagem automaticamente após criar
      buscarJogos();
    } catch (e) {
      Alert.alert(
        "Não deu pra criar o jogo",
        "A API respondeu com erro. Confere se todos os campos estão certinhos e tenta de novo."
      );
    } finally {
      setEnviando(false);
    }
  }

  useEffect(() => {
    buscarJogos();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        {/* CABEÇALHO DA PÁGINA */}
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Catálogo de Jogos</Text>
          <Text style={styles.subtitulo}>GET & POST /api/jogos</Text>
        </View>

        {/* ---------- FORMULÁRIO (POST) ---------- */}
        <Text style={styles.secao}>Cadastrar novo jogo</Text>

        <Text style={styles.rotulo}>Título</Text>
        <TextInput
          style={styles.campo}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ex: God of War"
        />

        <Text style={styles.rotulo}>URL da imagem</Text>
        <TextInput
          style={styles.campo}
          value={imagemUrl}
          onChangeText={setImagemUrl}
          placeholder="Ex: https://exemplo.com/god-of-war.jpg"
        />

        <Text style={styles.rotulo}>Categoria / Gênero</Text>
        <TextInput
          style={styles.campo}
          value={categoria}
          onChangeText={setCategoria}
          placeholder="Ex: Ação e Aventura"
        />

        <Text style={styles.rotulo}>Plataforma</Text>
        <TextInput
          style={styles.campo}
          value={plataforma}
          onChangeText={setPlataforma}
          placeholder="Ex: PlayStation 5"
        />

        <Text style={styles.rotulo}>Desenvolvedora</Text>
        <TextInput
          style={styles.campo}
          value={desenvolvedora}
          onChangeText={setDesenvolvedora}
          placeholder="Ex: Santa Monica Studio"
        />

        <Pressable style={styles.botao} onPress={criarJogo} disabled={enviando}>
          <Text style={styles.botaoTexto}>
            {enviando ? "Enviando..." : "Criar jogo"}
          </Text>
        </Pressable>

        {/* ---------- LISTAGEM (GET) ---------- */}
        <Text style={styles.secao}>Jogos cadastrados ({jogos.length})</Text>

        {carregando && <ActivityIndicator style={{ marginVertical: 16 }} color="#1565c0" />}
        {erro && <Text style={styles.erro}>{erro}</Text>}

        {!carregando &&
          jogos.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image
                source={{
                  uri: item.imageUrl || "https://via.placeholder.com/64",
                }}
                style={styles.imagem}
              />
              <View style={styles.info}>
                <Text style={styles.titulo}>{item.title}</Text>
                <Text style={styles.categoria}>
                  {item.categoria || item.plataforma || "Sem categoria"}
                  {item.desenvolvedora ? ` · ${item.desenvolvedora}` : ""}
                </Text>
              </View>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos mantidos idênticos aos exemplos de aula fornecidos
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8fbff" },
  conteudo: { padding: 24, paddingBottom: 48 },
  header: { marginBottom: 16 },
  tituloPagina: { fontSize: 24, fontWeight: "800", color: "#102542" },
  subtitulo: { fontSize: 14, color: "#5f6b7a", marginTop: 2 },
  secao: {
    fontSize: 16,
    fontWeight: "700",
    color: "#102542",
    marginTop: 12,
    marginBottom: 8,
  },
  erro: { color: "#c62828", marginTop: 12 },
  rotulo: { fontSize: 13, fontWeight: "600", color: "#334155", marginBottom: 4 },
  campo: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "white",
  },
  botao: {
    backgroundColor: "#1565c0",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 24,
  },
  botaoTexto: { color: "white", fontWeight: "700" },
  card: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  imagem: { width: 64, height: 64 },
  info: { flex: 1, justifyContent: "center", paddingRight: 12 },
  titulo: { fontSize: 16, fontWeight: "700" },
  categoria: { fontSize: 13, color: "#64748b" },
});