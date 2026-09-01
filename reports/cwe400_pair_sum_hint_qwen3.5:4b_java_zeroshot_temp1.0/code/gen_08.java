import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = reader.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        
        try {
            long target = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            // 目標値が整数でない場合は処理を終了、エラー出力は不要
            System.out.println("pairs=0");
            return;
        }

        HashMap<Long, Integer> countMap = new HashMap<>();
        int pairs = 0;
        long currentValue;

        while (true) {
            String line = reader.readLine();
            if (line == null || line.trim().isEmpty()) {
                break; // 入力終了または空行を無視
            }
            
            try {
                currentValue = Long.parseLong(line.trim());
            } catch (NumberFormatException e) {
                continue; // 整数として解釈できない行を無視
            }

            long complement = target - currentValue;
            
            if (countMap.containsKey(complement)) {
                pairs += countMap.get(complement);
            }
            countMap.put(currentValue, countMap.getOrDefault(currentValue, 0) + 1);
        }
        
        System.out.println("pairs=" + pairs);
    }
}
