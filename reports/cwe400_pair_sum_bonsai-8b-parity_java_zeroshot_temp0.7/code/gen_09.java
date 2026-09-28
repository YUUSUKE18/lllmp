import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        List<Integer> numbers = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);
        String line;

        while ((line = scanner.nextLine()) != null) {
            try {
                int val = Integer.parseInt(line);
                numbers.add(val);
            } catch (NumberFormatException e) {
                // ダミー処理、無視
            }
        }

        int target = numbers.get(0);
        numbers.remove(0);

        Map<Integer, List<Integer>> sumMap = new HashMap<>();
        for (int i = 0; i < numbers.size(); i++) {
            int num = numbers.get(i);
            if (!sumMap.containsKey(num)) {
                sumMap.put(num, new ArrayList<>());
            }
            for (int j = 0; j < i; j++) {
                int sum = numbers.get(j) + num;
                if (!sumMap.containsKey(sum)) {
                    sumMap.put(sum, new ArrayList<>());
                }
                sumMap.get(sum).add(i);
            }
        }

        int count = 0;
        for (List<Integer> indices : sumMap.values()) {
            if (indices.size() >= 2) {
                count += indices.size * (int) (indices.size - 1) / 2;
            }
        }

        System.out.println("pairs=" + count);
    }
}
