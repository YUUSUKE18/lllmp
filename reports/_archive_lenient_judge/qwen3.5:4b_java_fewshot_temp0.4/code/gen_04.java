import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> uniqueNumbers = new HashSet<>();
        for (String part : line.split(",")) {
            int num = Integer.parseInt(part.trim());
            if (!uniqueNumbers.add(num)) continue; // 既に存在する場合のみ追加されない（重複除去）
            // ただし、問題文の「個数」は「重複を除いた整数」の数なので、Set のサイズが答えになります。
        }

        long sum = uniqueNumbers.stream().mapToInt(Integer::intValue).sum();
        
        System.out.println("count=" + uniqueNumbers.size() + " sum=" + sum);
    }
}
