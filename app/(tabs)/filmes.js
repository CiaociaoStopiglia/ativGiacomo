import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const API_KEY = "cv_cDgFpQYN_oTZYKV-kLfL8EBUwcZKKQgsYC8m9T1aCyXv9mjin604q0g3AdXfINsZ";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

export default function JogosScreen() {
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

const [titulo, setTitulo] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [categoria, setCategoria] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [desenvolvedora, setDesenvolvedora] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function buscarJogos() {
    setCarregando(true);
    setErro(null);
    try {
        const resposta = await api.get("/api/jogos", {
            params: { limit: 50 },
        });
        setJogos(resposta.data.data);
    } catch (e) {
        setErro("Não foi possivel carregar os jogos. Tenta de novo em instantes")
    } finally {
        setCarregando(false);
    }
  }

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

      Alert.alert("Jogo criado!", resposta.data.title);
      setTitulo("");
      setImagemUrl("");
      setCategoria("");
      setPlataforma("");
      setDesenvolvedora("");

      buscarJogos();
    } catch (e) {
      Alert.alert(
        "Não deu pra criar o Jogo",
        "A API respondeu com erro. Confere se todos os campos estão certinhos e tenta de novo."
      );
    } finally {
      setEnviando(false);
    }
  }

  useEffect(() => {
    buscarJogos()
  }, []);

   return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Catálogo de Jogos</Text>
          <Text style={styles.subtitulo}>GET & POST /api/jogos</Text>
        </View>

        <Text style={styles.secao}>Cadastrar novo jogo</Text>

                <Text style={styles.rotulo}>Título</Text>
        <TextInput
          style={styles.campo}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ex: God of war"
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
          placeholder="Ex: Ação e estratégia"
        />

        <Text style={styles.rotulo}>Plataforma</Text>
        <TextInput
          style={styles.campo}
          value={plataforma}
          onChangeText={setPlataforma}
          placeholder="Ex: PS5"
          />

          <Text style={styles.rotulo}>Desenvolvedora</Text>
          <TextInput
          style={styles.campo}
          value={desenvolvedora}
          onChangeText={setDesenvolvedora}
          placeholder="EX: Santa Monica Studio"
        />

        <Pressable style={styles.botao} onPress={criarJogo} disabled={enviando}>
            <Text style={styles.botaoTexto}>
                {enviando ? "Enviando..." : "Criar jogo"}
            </Text>
        </Pressable>

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
                        {item.desenvolvedora ? `${item.desenvolvedora}` : ""}
                    </Text>
                </View>
            </View>
        ))}
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#0F1F17" },
  conteudo: { padding: 24, paddingBottom: 48 },
  header: { marginBottom: 16 },
  tituloPagina: { fontSize: 24, fontWeight: "800", color: "#fff6f6" },
  subtitulo: { fontSize: 14, color: "#5f6b7a", marginTop: 2 },
  secao: {
    fontSize: 16,
    fontWeight: "700",
    color: "#E0555F",
    marginTop: 12,
    marginBottom: 8,
  },
  erro: { color: "#c62828", marginTop: 12 },
  rotulo: { fontSize: 13, fontWeight: "600", color: "#faf8f8", marginBottom: 4 },
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
    backgroundColor: "#182A21",
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